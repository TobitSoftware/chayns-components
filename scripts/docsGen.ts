/* eslint-disable no-console */
/**
 * Docs/Types Generator for a Lerna/Monorepo (ts-morph).
 *
 * Scans configured packages, finds default component exports from src/index.ts,
 * extracts props (name/type/required/description) and referenced custom types (interfaces/types/enums).
 * Recursively adds all internal dependent types referenced by those types (across subpackages).
 *
 * Notes: Formatting/normalization is tuned; adapt with care.
 */

import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import {
    Project,
    Node,
    Type,
    PropertySignature,
    ParameterDeclaration,
    Symbol as MorphSymbol,
    CallExpression,
    VariableDeclaration,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    SourceFile,
    SyntaxKind,
    FunctionDeclaration,
    ArrowFunction,
    JSDoc,
    TypeFormatFlags,
} from 'ts-morph';
import type { GenerateTypesConfig } from '../docs.config.ts';

/* -------------------------------------------------------------------------- */
/* Bootstrapping                                                              */
/* -------------------------------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { default: rawConfig } = await import(
    pathToFileURL(path.resolve(__dirname, '../docs.config.ts')).href
);
const config = rawConfig as GenerateTypesConfig;

const project = new Project({
    tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
});

/* versions per subpackage */
const packageVersions: Record<string, string> = {};
for (const pkg of config.packages) {
    const pkgJsonPath = path.resolve(config.rootDir, pkg, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
        try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
            if (pkgJson.version) packageVersions[pkg] = pkgJson.version;
        } catch {
            /* ignore */
        }
    }
}

/**
 * Recursively load all source files from each subpackage,
 * including types/*.ts and re-exported modules from @chayns-components/* imports.
 */
for (const pkg of config.packages) {
    const pkgSrc = path.resolve(config.rootDir, pkg, 'src');
    if (!fs.existsSync(pkgSrc)) continue;
    project.addSourceFilesAtPaths([
        `${pkgSrc}/**/*.ts`,
        `${pkgSrc}/**/*.tsx`,
        `${pkgSrc}/**/*.d.ts`,
    ]);
}

// Load referenced internal packages as well
const addedFiles = new Set(project.getSourceFiles().map((f) => f.getFilePath()));
for (const sf of project.getSourceFiles()) {
    for (const imp of sf.getImportDeclarations()) {
        const spec = imp.getModuleSpecifierValue();
        if (spec.startsWith('@chayns-components/')) {
            const subPkg = spec.replace('@chayns-components/', '');
            const subSrc = path.resolve(config.rootDir, subPkg, 'src');
            if (fs.existsSync(subSrc)) {
                const files = project.addSourceFilesAtPaths([
                    `${subSrc}/**/*.ts`,
                    `${subSrc}/**/*.tsx`,
                    `${subSrc}/**/*.d.ts`,
                ]);
                files.forEach((f) => addedFiles.add(f.getFilePath()));
            }
        }
    }
}

/* add version to filter */
config.filters = config.filters.map((f) => {
    const version = packageVersions[f.id];
    return version ? { ...f, version } : f;
});

const output: Record<string, any> = { filter: config.filters, packages: {} };

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

const DEBUG_MISSING_TYPES = true;
const missingTypes = new Set<string>();

const PRIMS = new Set(['string', 'number', 'boolean', 'null', 'any', 'void', 'never', 'unknown']);
const GLOBALS = new Set(['ReactNode', 'ReactElement', 'CSSProperties', 'Element', 'HTMLElement']);
let ALREADY_EXPANDED = new Set<string>(); // ← wird pro Komponente zurückgesetzt

const handlerAliases = [
    'ChangeEventHandler',
    'FocusEventHandler',
    'KeyboardEventHandler',
    'MouseEventHandler',
    'PointerEventHandler',
    'TouchEventHandler',
    'UIEventHandler',
    'WheelEventHandler',
    'DragEventHandler',
    'FormEventHandler',
];

const cssPropName = (n: string) => n.charAt(0).toLowerCase() + n.slice(1);

const mapCSS = (text: string) =>
    text
        .replace(
            /import\((?:'|").*?(?:'|")\)\.Property\.([A-Za-z0-9_]+)/g,
            (_m, p1: string) => `CSSProperties['${cssPropName(p1)}']`,
        )
        .replace(
            /\bProperty\.([A-Za-z0-9_]+)\b/g,
            (_m, p1: string) => `CSSProperties['${cssPropName(p1)}']`,
        );

const looksLikeCssColorUnion = (text: string) =>
    /ActiveBorder|currentcolor|ThreeDLightShadow/.test(text) && text.length > 300;

const compressCssUnions = (text: string) =>
    looksLikeCssColorUnion(text) ? `CSSProperties['color']` : text;

const dropUndefinedAndBools = (text: string) =>
    text
        .replace(/\bundefined\s*\|\s*/g, '')
        .replace(/\s*\|\s*undefined\b/g, '')
        .replace(/\bfalse\s*\|\s*true\b/g, 'boolean');

const stripReactAndImports = (text: string) =>
    text.replace(/React\./g, '').replace(/import\((?:'|").*?(?:'|")\)\./g, '');

const stripLegacyRef = (text: string) =>
    text
        .replace(/\bLegacyRef<(.+?)>/g, '$1')
        .replace(/\bRefObject<(.+?)>/g, '$1')
        .replace(
            /\bnull\s*\|\s*string\s*\|\s*\(instance:\s*null\s*\|\s*([^)]*?)\)\s*=>\s*void\s*\|\s*RefObject\b/g,
            '$1',
        );

const compactSpaces = (text: string) => text.replace(/\s+/g, ' ').trim();

const normalizeCallbacks = (text: string) =>
    text
        .replace(/^\(\s*\((.*?)\)\s*\)$/s, '($1)')
        .replace(/\(\(\s*([^)]+?)\)\s*=>/g, '($1) =>')
        .replace(/\(\((.*?)\)\)/g, '($1)');

const collapseReactNode = (text: string) =>
    /string/.test(text) &&
    /number/.test(text) &&
    /boolean/.test(text) &&
    /null/.test(text) &&
    /ReactElement/.test(text) &&
    /ReactPortal/.test(text)
        ? 'ReactNode'
        : text;

const finalizeText = (text: string) =>
    compactSpaces(
        stripLegacyRef(
            normalizeCallbacks(
                collapseReactNode(
                    stripReactAndImports(dropUndefinedAndBools(compressCssUnions(mapCSS(text)))),
                ),
            ),
        ),
    );

const isSymbolOptional = (sym: MorphSymbol) => {
    const decl = sym.getDeclarations()?.[0];
    if (!decl) return false;
    if (Node.isPropertySignature(decl) || Node.isParameter(decl)) {
        return (decl as PropertySignature | ParameterDeclaration).hasQuestionToken?.() ?? false;
    }
    return false;
};

/**
 * Detect if a source file belongs to an internal monorepo package.
 * Accepts any file under /packages/, including node_modules/@chayns-components.
 */
const isInternalSourceFile = (sf: SourceFile | undefined): boolean => {
    if (!sf) return false;
    const filePath = sf.getFilePath();

    // Mark all internal /packages/* sources as internal
    if (filePath.includes(`${path.sep}packages${path.sep}`)) return true;

    // Also treat linked @chayns-components/ subpackages as internal
    if (filePath.includes(`${path.sep}node_modules${path.sep}@chayns-components${path.sep}`))
        return true;

    // Everything else is external
    return false;
};

const resolveFromDeclaration = (decl: Node, bag: TypesBag): string | null => {
    const sf = decl.getSourceFile();
    if (!isInternalSourceFile(sf)) return null;

    if (Node.isEnumMember(decl)) {
        const parent = decl.getParent();
        if (Node.isEnumDeclaration(parent)) {
            const name = parent.getName();
            if (!name) return null;
            addType(bag, name, renderEnum(parent));
            return name;
        }
        return null;
    }

    if (Node.isEnumDeclaration(decl)) {
        const name = decl.getName();
        if (!name) return null;
        addType(bag, name, renderEnum(decl));
        return name;
    }

    if (Node.isInterfaceDeclaration(decl)) {
        const name = decl.getName();
        if (!name) return null;
        for (const p of decl.getProperties()) ensureCollectType(p.getType(), bag);
        addType(bag, name, renderInterface(decl, bag));
        return name;
    }

    if (Node.isTypeAliasDeclaration(decl)) {
        const name = decl.getName();
        if (!name) return null;
        const tp = decl.getType();
        ensureCollectType(tp, bag);
        addType(bag, name, renderAlias(decl, bag));
        return name;
    }

    return null;
};

/* -------------------------------------------------------------------------- */
/* Aliases from index.ts                                                      */
/* -------------------------------------------------------------------------- */

const aliasMap = new Map<string, string>();

const collectAliasesFromIndex = (sf: SourceFile) => {
    const raw = sf.getFullText().replace(/\s+/g, ' ');
    for (const m of raw.matchAll(/export\s+type\s*{([^}]*)}/g)) {
        const block = m[1];
        for (const mm of block.matchAll(/\b([\w\d_]+)\s+as\s+([\w\d_]+)/g))
            aliasMap.set(mm[1], mm[2]);
    }
    for (const m of raw.matchAll(/export\s*{([^}]*)}/g)) {
        const block = m[1];
        for (const mm of block.matchAll(/\btype\s+([\w\d_]+)\s+as\s+([\w\d_]+)/g))
            aliasMap.set(mm[1], mm[2]);
    }
};

for (const pkg of config.packages) {
    const indexPath = path.resolve(config.rootDir, pkg, 'src/index.ts');
    if (!fs.existsSync(indexPath)) continue;
    const sf = project.addSourceFileAtPathIfExists(indexPath);
    if (sf) collectAliasesFromIndex(sf);
}

const applyAliases = (text: string) => {
    let t = text;
    aliasMap.forEach((alias, orig) => {
        const re = new RegExp(`\\b${orig}\\b`, 'g');
        t = t.replace(re, alias);
    });
    return t;
};

/* -------------------------------------------------------------------------- */
/* Candidate extraction from type text (for aliases/enums flattened by TS)    */
/* -------------------------------------------------------------------------- */

const BUILTIN_UTILITY = new Set([
    'Record',
    'Partial',
    'Required',
    'Pick',
    'Omit',
    'Readonly',
    'Exclude',
    'Extract',
]);
const BUILTIN_EVENTS = new Set([
    'Event',
    'UIEvent',
    'MouseEvent',
    'FocusEvent',
    'KeyboardEvent',
    'TouchEvent',
    'DragEvent',
    'WheelEvent',
    'ClipboardEvent',
    'ChangeEvent',
    'SyntheticEvent',
]);
const BUILTIN_DOM = /^HTML[A-Za-z0-9]*Element$/;

const shouldIgnoreName = (name: string) => {
    if (!name) return true;
    if (PRIMS.has(name) || GLOBALS.has(name)) return true;
    if (BUILTIN_UTILITY.has(name)) return true;
    if (BUILTIN_EVENTS.has(name)) return true;
    if (BUILTIN_DOM.test(name)) return true;
    if (name === '__type') return true;
    return false;
};

const collectNamesFromTypeText = (text: string): string[] => {
    if (!text) return [];
    const names = new Set<string>();

    for (const m of text.matchAll(/\b[A-Z][A-Za-z0-9_]*\b/g)) {
        const id = m[0];
        if (!shouldIgnoreName(id)) names.add(id);
    }
    for (const m of text.matchAll(/\b([A-Z][A-Za-z0-9_]*)\s*\[/g)) {
        const id = m[1];
        if (!shouldIgnoreName(id)) names.add(id);
    }
    for (const m of text.matchAll(/\b([A-Z][A-Za-z0-9_]*)\.[A-Za-z0-9_]+\b/g)) {
        const id = m[1];
        if (!shouldIgnoreName(id)) names.add(id);
    }

    return [...names];
};

/* -------------------------------------------------------------------------- */
/* Type rendering & recursive collection                                      */
/* -------------------------------------------------------------------------- */

type TypesBag = Map<string, { name: string; type: string }>;

const addType = (bag: TypesBag, name: string, typeBody: string) => {
    if (!name) return;
    const display = aliasMap.get(name) ?? name;
    if (PRIMS.has(display) || GLOBALS.has(display)) return;
    if (!bag.has(display)) bag.set(display, { name: display, type: typeBody });
};

/**
 * Find a declared node (interface, type, enum) anywhere in the project.
 * Uses an internal cache to speed up lookups.
 */
const _declCache = new Map<string, InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration>();

/**
 * Find any declared type, interface or enum anywhere in the monorepo project.
 * Searches all source files, including subpackages and re-exports.
 */
const findDeclaredNode = (
    name: string,
): InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | null => {
    // direct matches first
    for (const sf of project.getSourceFiles()) {
        const i = sf.getInterface(name);
        if (i) return i;
        const t = sf.getTypeAlias(name);
        if (t) return t;
        const e = sf.getEnum(name);
        if (e) return e;
    }

    // look for re-exported or aliased symbols
    for (const sf of project.getSourceFiles()) {
        const sym = sf.getExportSymbols().find((s) => s.getName() === name);
        const decl = sym?.getDeclarations()?.[0];
        if (
            decl &&
            (Node.isInterfaceDeclaration(decl) ||
                Node.isTypeAliasDeclaration(decl) ||
                Node.isEnumDeclaration(decl))
        ) {
            return decl;
        }
    }

    // alias map fallback
    for (const [orig, alias] of aliasMap.entries()) {
        if (alias === name) return findDeclaredNode(orig);
    }

    return null;
};

const renderEnum = (e: EnumDeclaration) =>
    `{\n${e
        .getMembers()
        .map((m) => {
            const nm = m.getName();
            const v = m.getValue();
            return typeof v === 'number'
                ? `  ${nm} = ${v}`
                : typeof v === 'string'
                  ? `  ${nm} = "${v}"`
                  : `  ${nm}`;
        })
        .join(',\n')}\n}`;

const renderInterface = (i: InterfaceDeclaration, bag: TypesBag) =>
    `{\n${i
        .getProperties()
        .map((p: PropertySignature) => {
            const pt = p.getType();
            const opt = p.hasQuestionToken() ? '?' : '';
            return `  ${p.getName()}${opt}: ${pretty(pt, bag)};`;
        })
        .join('\n')}\n}`;

const renderAlias = (t: TypeAliasDeclaration, bag: TypesBag) => pretty(t.getType(), bag);

/**
 * Recursively collect all nested types referenced by a Type.
 * Traverses symbol-based links and literal text-based references.
 */
const ensureCollectType = (t: Type, bag: TypesBag, seen = new Set<Type>()) => {
    if (!t || seen.has(t)) return;
    seen.add(t);

    const sym = t.getSymbol();
    const decl = sym?.getDeclarations()?.[0];

    // Prefer declaration-based resolution for type references (also works for d.ts in node_modules/@chayns-components)
    if ((t as any).isTypeReference?.()) {
        if (decl && isInternalSourceFile(decl.getSourceFile())) {
            resolveFromDeclaration(decl, bag);
        } else {
            const refName = sym?.getName();
            if (refName) resolveNamedRecursive(refName, bag);
        }
        for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag, seen);
        return;
    }

    // Arrays
    if (t.isArray()) {
        const et = t.getArrayElementType();
        if (et) ensureCollectType(et, bag, seen);
        return;
    }

    // Unions / Intersections
    if (t.isUnion() || t.isIntersection()) {
        const types = t.getUnionTypes?.() ?? t.getIntersectionTypes?.() ?? [];
        // Try to resolve enum by checking enum member declarations
        let parentEnumDecl: EnumDeclaration | null = null;
        let allMembers = true;
        for (const ut of types) {
            const s = ut.getSymbol();
            const d = s?.getDeclarations()?.[0];
            if (!d || !Node.isEnumMember?.(d)) {
                allMembers = false;
                break;
            }
            const par = d.getParent();
            if (!par || !Node.isEnumDeclaration(par)) {
                allMembers = false;
                break;
            }
            if (!parentEnumDecl) parentEnumDecl = par;
            else if (parentEnumDecl !== par) {
                allMembers = false;
                break;
            }
        }
        if (allMembers && parentEnumDecl && isInternalSourceFile(parentEnumDecl.getSourceFile())) {
            resolveFromDeclaration(parentEnumDecl, bag);
            return; // rest wird im pretty() als Enum-Name dargestellt
        }

        for (const ut of types) ensureCollectType(ut, bag, seen);
        return;
    }

    // Functions
    const sigs = t.getCallSignatures();
    if (sigs.length > 0) {
        const s = sigs[0];
        for (const p of s.getParameters()) {
            const d = p.getDeclarations()?.[0];
            const pt = d ? d.getType() : p.getTypeAtLocation(d ?? (p as any));
            ensureCollectType(pt, bag, seen);
        }
        ensureCollectType(s.getReturnType(), bag, seen);
        return;
    }

    // Generics
    for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag, seen);

    // Textual fallback (be conservative to avoid noise)
    const text = t.getText();
    for (const n of collectNamesFromTypeText(text)) {
        // Nur auflösen, wenn wir die Deklaration tatsächlich finden (lokal) – vermeidet Rauschen
        const found = findDeclaredNode(n);
        if (found) resolveNamedRecursive(n, bag);
    }
};

/**
 * Recursively resolve internal types (type/interface/enum) and collect them in the types bag.
 */
const resolveNamedRecursive = (name: string, bag: TypesBag) => {
    const display = aliasMap.get(name) ?? name;
    if (!display || PRIMS.has(display) || GLOBALS.has(display)) return;
    if (shouldIgnoreName(display)) return;
    if (ALREADY_EXPANDED.has(display)) return;

    const decl = findDeclaredNode(display);
    if (!decl) return;

    const sf = decl.getSourceFile();
    if (!isInternalSourceFile(sf)) return;

    ALREADY_EXPANDED.add(display);
    if (bag.has(display)) return;

    // --- Enum ---
    if (Node.isEnumDeclaration(decl)) {
        addType(bag, display, renderEnum(decl));
        for (const sub of collectNamesFromTypeText(decl.getText())) {
            if (sub !== name) resolveNamedRecursive(sub, bag);
        }
        return;
    }

    // --- Interface ---
    if (Node.isInterfaceDeclaration(decl)) {
        addType(bag, display, renderInterface(decl, bag));
        for (const prop of decl.getProperties()) ensureCollectType(prop.getType(), bag);
        for (const sub of collectNamesFromTypeText(decl.getText())) {
            if (sub !== name) resolveNamedRecursive(sub, bag);
        }
        return;
    }

    // --- TypeAlias ---
    if (Node.isTypeAliasDeclaration(decl)) {
        const tp = decl.getType();
        addType(bag, display, renderAlias(decl, bag));
        ensureCollectType(tp, bag);
        for (const sub of collectNamesFromTypeText(decl.getText())) {
            if (sub !== name) resolveNamedRecursive(sub, bag);
        }
        return;
    }
};

const tryCollapseEnumUnionToName = (t: Type, bag: TypesBag): string | null => {
    if (!(t.isUnion() || t.isIntersection())) return null;
    const types = t.getUnionTypes?.() ?? t.getIntersectionTypes?.() ?? [];
    if (!types.length) return null;

    const texts = types.map((x) => x?.getText?.() ?? '').filter(Boolean);
    if (texts.length > 0 && texts.every((m) => /^\w+\.[A-Za-z0-9_]+$/.test(m))) {
        const root = texts[0].split('.')[0];
        resolveNamedRecursive(root, bag);
        return root;
    }

    let enumName: string | null = null;
    let allEnumMembers = true;
    for (const ut of types) {
        const sym = ut.getSymbol();
        if (!sym) {
            allEnumMembers = false;
            break;
        }
        const d = sym.getDeclarations()?.[0];
        if (!d || !Node.isEnumMember?.(d)) {
            allEnumMembers = false;
            break;
        }
        const parent = d.getParent();
        if (!parent || !Node.isEnumDeclaration(parent)) {
            allEnumMembers = false;
            break;
        }
        const thisEnum = parent.getName();
        if (!thisEnum) {
            allEnumMembers = false;
            break;
        }
        if (!enumName) enumName = thisEnum;
        else if (enumName !== thisEnum) {
            allEnumMembers = false;
            break;
        }
    }
    if (allEnumMembers && enumName) {
        resolveNamedRecursive(enumName, bag);
        return aliasMap.get(enumName) ?? enumName;
    }

    return null;
};

const getReactHandlerAlias = (t: Type): string | null => {
    const symbol = t.getAliasSymbol?.();
    if (!symbol) return null;
    const name = symbol.getName();
    if (!handlerAliases.includes(name)) return null;
    const args = t.getAliasTypeArguments?.() ?? [];
    return args.length ? `${name}<${args.map((a) => pretty(a, new Map())).join(', ')}>` : name;
};

/**
 * Convert a type into a readable string while resolving all internal references.
 * Automatically collects any custom types into the types bag.
 */
const pretty = (t: Type, bag: TypesBag): string => {
    if (!t) return 'unknown';

    const sym = t.getSymbol();
    const name = sym?.getName();

    // Exclude DOM/React/CSS/Window etc. from types
    const EXTERNALS = new Set([
        'Window',
        'Document',
        'HTMLElement',
        'HTMLDivElement',
        'HTMLSpanElement',
        'HTMLInputElement',
        'ReactNode',
        'ReactElement',
        'ReactPortal',
        'CSSProperties',
        'MouseEventHandler',
        'FocusEventHandler',
        'ChangeEventHandler',
        'KeyboardEventHandler',
        'TouchEventHandler',
        'DragEventHandler',
        'WheelEventHandler',
        'ClipboardEventHandler',
        'SyntheticEvent',
    ]);
    if (name && EXTERNALS.has(name)) return name;

    // Recognize event handler aliases
    const aliasHandler = getReactHandlerAlias(t);
    if (aliasHandler) return aliasHandler;

    // Keep keyof/typeof intact
    const rawText = t.getText(undefined, TypeFormatFlags.NoTruncation).trim();
    if (/^(keyof|typeof)\b/.test(rawText)) return rawText;

    // --- TypeReference ---
    if ((t as any).isTypeReference?.()) {
        const refSym = t.getSymbol();
        const refName = refSym?.getName();
        if (refName && !EXTERNALS.has(refName)) {
            resolveNamedRecursive(refName, bag);
        }
        for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag);
        return aliasMap.get(refName ?? '') ?? refName ?? rawText;
    }

    // --- Array ---
    if (t.isArray()) {
        const et = t.getArrayElementType();
        return `${pretty(et ?? t, bag)}[]`;
    }

    // --- Unions / Intersections ---
    if (t.isUnion() || t.isIntersection()) {
        const collapsed = tryCollapseEnumUnionToName(t, bag);
        if (collapsed) return collapsed;
        const types = t.isUnion() ? t.getUnionTypes() : t.getIntersectionTypes();
        const parts = types.map((x) => {
            ensureCollectType(x, bag);
            return pretty(x, bag);
        });
        return finalizeText(parts.join(t.isUnion() ? ' | ' : ' & '));
    }

    // --- Functions ---
    const sigs = t.getCallSignatures();
    if (sigs.length > 0) {
        const s = sigs[0];
        const params = s.getParameters().map((p) => {
            const d = p.getDeclarations()?.[0];
            const pt = d ? d.getType() : p.getTypeAtLocation(d ?? (p as any));
            return `${p.getName()}: ${pretty(pt, bag)}`;
        });
        const ret = s.getReturnType();
        return `(${params.join(', ')}) => ${pretty(ret, bag)}`;
    }

    // --- Named Symbols (Type/Interface/Enum) ---
    if (name && !EXTERNALS.has(name)) {
        resolveNamedRecursive(name, bag);
        return aliasMap.get(name) ?? name;
    }

    // --- Fallback (Text Parsing) ---
    const text = finalizeText(applyAliases(t.getText()));
    for (const n of collectNamesFromTypeText(text)) {
        if (!EXTERNALS.has(n)) resolveNamedRecursive(n, bag);
    }
    return text;
};

/* -------------------------------------------------------------------------- */
/* Props extraction + ref handling                                            */
/* -------------------------------------------------------------------------- */

const extractProps = (propsType: Type, bag: TypesBag) => {
    const apparent = propsType.getApparentType?.() ?? propsType;
    const syms = apparent?.getProperties?.() ?? [];
    const props = syms
        .map((s) => {
            const decl = s.getValueDeclaration();
            if (!decl || s.getName() === 'key') return null;

            const name = s.getName();

            const actualType = decl.getType();
            ensureCollectType(actualType, bag);

            const declaredNode = (decl as any).getTypeNode?.();
            let displayText = finalizeText(
                applyAliases(declaredNode?.getText?.() ?? pretty(actualType, bag)),
            );

            if (displayText === 'VoidFunction') displayText = '() => void';

            for (const n of collectNamesFromTypeText(displayText)) resolveNamedRecursive(n, bag);

            if (/\b\w+\.[A-Za-z0-9_]+\b(?:\s*\|\s*\w+\.[A-Za-z0-9_]+\b)+/.test(displayText)) {
                const m = displayText.match(/\b(\w+)\.[A-Za-z0-9_]+\b/);
                if (m) {
                    resolveNamedRecursive(m[1], bag);
                    displayText = m[1];
                }
            }

            const jsDocs = (decl as any).getJsDocs?.() as JSDoc[];
            const comment = jsDocs?.[0]?.getComment() || undefined;
            const required = !isSymbolOptional(s);

            const prop: any = { name, type: displayText, required };
            if (comment) prop.description = comment;
            return prop;
        })
        .filter(Boolean) as Array<{
        name: string;
        type: string;
        required: boolean;
        description?: string;
    }>;

    props.sort((a, b) => a.name.localeCompare(b.name));
    return props;
};

const getRefTypeFromDecl = (decl: Node): Type | null => {
    const parseCall = (call: CallExpression): Type | null => {
        if (!/forwardRef/.test(call.getExpression().getText())) return null;
        const args = call.getTypeArguments();
        if (args.length >= 1) return args[0].getType();
        const fn = call.getArguments()[0];
        if (Node.isArrowFunction(fn)) {
            const params = fn.getParameters();
            if (params.length >= 2) return params[1].getType();
        }
        return null;
    };

    if (Node.isVariableDeclaration(decl)) {
        const init = (decl as VariableDeclaration).getInitializer();
        if (init && Node.isCallExpression(init)) return parseCall(init);
    }
    const call = decl.getFirstDescendantByKind(SyntaxKind.CallExpression);
    return call ? parseCall(call as CallExpression) : null;
};

const getExportDecls = (s: MorphSymbol) =>
    (s as any).getAliasedSymbol?.()?.getDeclarations?.() ?? s.getDeclarations() ?? [];

const getTypeArg0 = (t: Type): Type | null => (t.getTypeArguments?.() ?? [])[0] ?? null;

const stripRefAttributesFromProps = (t: Type): Type => {
    if (!t.isIntersection()) return t;
    const parts = t.getIntersectionTypes() ?? [];
    const kept = parts.filter((p) => {
        const sym = p.getSymbol();
        if (!sym) return true;
        const nm = sym.getName();
        if (nm === 'RefAttributes') return false;
        if (/^RefAttributes<.+>$/.test(p.getText())) return false;
        return true;
    });
    return kept[0] ?? t;
};

const unwrapComponentPropsType = (ct: Type): Type | null => {
    const nm = ct.getSymbol()?.getName() ?? '';
    if (/ForwardRefExoticComponent/.test(nm)) {
        const arg = getTypeArg0(ct);
        return arg ? stripRefAttributesFromProps(arg) : null;
    }
    if (/MemoExoticComponent|NamedExoticComponent/.test(nm)) {
        const arg = getTypeArg0(ct);
        return arg ? unwrapComponentPropsType(arg) : null;
    }
    if (/ComponentType|FC|FunctionComponent|JSXElementConstructor/.test(nm)) {
        return getTypeArg0(ct);
    }
    return getTypeArg0(ct);
};

const tryGetPropsFromFunctionParam = (decl: Node): Type | null => {
    let fn: ArrowFunction | FunctionDeclaration | null = null;
    if (Node.isVariableDeclaration(decl)) {
        const init = (decl as VariableDeclaration).getInitializer();
        if (init && Node.isArrowFunction(init)) fn = init;
    } else if (Node.isFunctionDeclaration(decl)) {
        fn = decl;
    }
    if (!fn) return null;
    const params = fn.getParameters();
    if (!params.length) return null;
    return params[0].getType() ?? null;
};

/* -------------------------------------------------------------------------- */
/* Component processing                                                       */
/* -------------------------------------------------------------------------- */

const processComponent = (pkg: string, exp: MorphSymbol) => {
    // fix: avoid cross-component suppression of types
    ALREADY_EXPANDED = new Set<string>();

    const decls = getExportDecls(exp);
    if (!decls.length) return null;

    const compType = decls[0].getType();
    const typesBag: TypesBag = new Map();

    let propsType: Type | null = null;
    for (const d of decls) {
        propsType = tryGetPropsFromFunctionParam(d);
        if (propsType) break;
    }
    if (!propsType) propsType = unwrapComponentPropsType(compType);

    const props = propsType ? extractProps(propsType, typesBag) : [];

    let refType: Type | null = null;
    for (const d of decls) {
        const rt = getRefTypeFromDecl(d);
        if (rt) {
            refType = rt;
            break;
        }
    }
    if (refType) {
        let refText = finalizeText(applyAliases(refType.getText()));
        refText = refText
            .replace(/^(?:LegacyRef|RefObject)<(.+?)>$/, '$1')
            .replace(
                /\bnull\s*\|\s*string\s*\|\s*\(instance:\s*null\s*\|\s*([^)]*?)\)\s*=>\s*void\s*\|\s*RefObject\b/,
                '$1',
            );

        const idx = props.findIndex((p) => p.name === 'ref');
        if (idx >= 0) props[idx] = { ...props[idx], type: refText, required: false };
        else props.push({ name: 'ref', type: refText, required: false });

        const sym = refType.getSymbol();
        if (sym) resolveNamedRecursive(sym.getName(), typesBag);
    }

    const types = [...typesBag.values()]
        .map((t) => ({ name: t.name, type: finalizeText(applyAliases(t.type)) }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const displayName = exp.getName();
    const code = `import React from 'react';\nimport { ${displayName} } from '@chayns-components/${pkg}';\n\n<${displayName} {...props}/>`;

    return { name: displayName, code, types, props };
};

/* -------------------------------------------------------------------------- */
/* Iterate packages                                                           */
/* -------------------------------------------------------------------------- */

for (const pkg of config.packages) {
    const indexPath = path.resolve(config.rootDir, pkg, 'src/index.ts');
    if (!fs.existsSync(indexPath)) continue;

    const sf = project.addSourceFileAtPathIfExists(indexPath);
    if (!sf) continue;

    const raw = sf.getFullText();
    const defaultCompMatches = [...raw.matchAll(/export\s*{\s*default\s+as\s+(\w+)/g)];
    if (!defaultCompMatches.length) continue;

    const components: any[] = [];
    for (const [, compName] of defaultCompMatches) {
        const symbol = sf.getExportSymbols().find((s) => s.getName() === compName);
        if (!symbol) continue;
        const comp = processComponent(pkg, symbol);
        if (comp) components.push(comp);
    }

    if (components.length) output.packages[pkg] = components;
    console.log(`📦 ${pkg}: collected ${components.length} components.`);
}

/* -------------------------------------------------------------------------- */
/* Write JSON                                                                 */
/* -------------------------------------------------------------------------- */

fs.mkdirSync(path.dirname(config.outputFile), { recursive: true });
fs.writeFileSync(config.outputFile, JSON.stringify(output, null, 2), 'utf8');
console.log(`✅ Docs JSON generated at: ${config.outputFile}`);

/* -------------------------------------------------------------------------- */
/* Debug: report missing internal types                                       */
/* -------------------------------------------------------------------------- */

if (DEBUG_MISSING_TYPES && missingTypes.size > 0) {
    const ignore = new Set<string>([
        'Record',
        'Partial',
        'Required',
        'Pick',
        'Omit',
        'Readonly',
        'VoidFunction',
        'Event',
        'UIEvent',
        'MouseEvent',
        'FocusEvent',
        'KeyboardEvent',
        'TouchEvent',
        'DragEvent',
        'WheelEvent',
        'ClipboardEvent',
        'ChangeEvent',
        'SyntheticEvent',
    ]);
    const domEl = (n: string) => /^HTML[A-Za-z0-9]*Element$/.test(n);
    const missing = [...missingTypes].filter(
        (n) => !GLOBALS.has(n) && !PRIMS.has(n) && !ignore.has(n) && n !== '__type' && !domEl(n),
    );
    if (missing.length) {
        console.warn(
            '⚠️ Missing type(s) (referenced but not resolved locally):',
            [...new Set(missing)].sort().join(', '),
        );
    }
}
