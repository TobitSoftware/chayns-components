/* eslint-disable */
// @ts-nocheck
/**
 * ──────────────────────────────────────────────────────────────────────────────
 * Docs/Types Generator for a Lerna/Monorepo (ts-morph)
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * This script scans all configured Lerna packages and automatically generates
 * documentation JSON that contains:
 *   • Default component exports from `src/index.ts`
 *   • Extracted props (name, type, required, description)
 *   • Recursively resolved custom types (interfaces, type aliases, enums)
 *
 * Notes:
 *   - You can still optimize or refactor this script.
 *   - However, getting it to this state required a *lot* of fine-tuning due to
 *     complex `ts-morph` type flattening and aliasing behavior.
 *   - Proceed carefully when changing normalization or recursion logic.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import {
    ArrowFunction,
    CallExpression,
    EnumDeclaration,
    FunctionDeclaration,
    InterfaceDeclaration,
    JSDoc,
    Node,
    ParameterDeclaration,
    Project,
    PropertySignature,
    SourceFile,
    Symbol as MorphSymbol,
    SyntaxKind,
    Type,
    TypeAliasDeclaration,
    TypeFormatFlags,
    VariableDeclaration,
} from 'ts-morph';
import type { GenerateTypesConfig } from '../docs.config.ts';
import { uploadDocs } from './upload-docs.ts';

/* -------------------------------------------------------------------------- */
/* Bootstrapping + Debug                                                      */
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

/* read versions per subpackage (added into filters) */
const packageVersions: Record<string, string> = {};
for (const pkg of config.packages) {
    const pkgJsonPath = path.resolve(config.rootDir, pkg, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
        try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
            if (pkgJson.version) packageVersions[pkg] = pkgJson.version;
        } catch {
            /* ignore parse errors */
        }
    }
}

/**
 * Load all source files for each subpackage, including .d.ts (to see re-exports).
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

/**
 * Add referenced internal packages (imports like @chayns-components/*) eagerly.
 */
for (const sf of project.getSourceFiles()) {
    for (const imp of sf.getImportDeclarations()) {
        const spec = imp.getModuleSpecifierValue();
        if (spec.startsWith('@chayns-components/')) {
            const subPkg = spec.replace('@chayns-components/', '');
            const subSrc = path.resolve(config.rootDir, subPkg, 'src');
            if (fs.existsSync(subSrc)) {
                project.addSourceFilesAtPaths([
                    `${subSrc}/**/*.ts`,
                    `${subSrc}/**/*.tsx`,
                    `${subSrc}/**/*.d.ts`,
                ]);
            }
        }
    }
}

/* attach version into filter entries */
config.filters = config.filters.map((f) => {
    const version = packageVersions[f.id];
    return version ? { ...f, version } : f;
});

const output: Record<string, any> = { filter: config.filters, packages: {} };

/* -------------------------------------------------------------------------- */
/* Utilities + Normalization                                                  */
/* -------------------------------------------------------------------------- */

const DEBUG_MISSING_TYPES = true;
const missingTypes = new Set<string>();

const PRIMS = new Set(['string', 'number', 'boolean', 'null', 'any', 'void', 'never', 'unknown']);

const GLOBALS = new Set(['ReactNode', 'ReactElement', 'CSSProperties', 'Element', 'HTMLElement']);

let ALREADY_EXPANDED = new Set<string>(); // reset per component

const HANDLER_ALIASES = [
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

const IGNORED_TYPES = new Set<string>([
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
    'Promise',
    'Array',
    'Date',
]);

const EXTERNALS = new Set([
    'Window',
    'Document',
    'Navigator',
    'Location',
    'Storage',
    'HTMLElement',
    'HTMLDivElement',
    'HTMLInputElement',
    'HTMLTextAreaElement',
    'HTMLButtonElement',
    'HTMLImageElement',
    'Event',
    'UIEvent',
    'MouseEvent',
    'FocusEvent',
    'KeyboardEvent',
    'ChangeEvent',
    'ReactNode',
    'ReactElement',
    'ReactPortal',
    'CSSProperties',
    'Promise',
]);

const cssPropName = (n: string) => n.charAt(0).toLowerCase() + n.slice(1);

const mapCSS = (text: string) =>
    text
        .replace(
            /import\(['"].*?['"]\)\.Property\.([A-Za-z0-9_]+)/g,
            (_m, p1: string) => `CSSProperties['${cssPropName(p1)}']`,
        )
        .replace(
            /\bProperty\.([A-Za-z0-9_]+)\b/g,
            (_m, p1: string) => `CSSProperties['${cssPropName(p1)}']`,
        );

const looksLikeCssColorUnion = (t: string) =>
    /ActiveBorder|currentcolor|ThreeDLightShadow/.test(t) && t.length > 300;

const compressCssUnions = (t: string) => (looksLikeCssColorUnion(t) ? `CSSProperties['color']` : t);

const dropUndefinedAndBools = (t: string) =>
    t
        .replace(/\bundefined\s*\|\s*/g, '')
        .replace(/\s*\|\s*undefined\b/g, '')
        .replace(/\bfalse\s*\|\s*true\b/g, 'boolean');

const stripReactAndImports = (t: string) =>
    t.replace(/React\./g, '').replace(/import\(['"].*?['"]\)\./g, '');

const stripLegacyRef = (t: string) =>
    t
        .replace(/\bLegacyRef<(.+?)>/g, '$1')
        .replace(/\bRefObject<(.+?)>/g, '$1')
        .replace(
            /\bnull\s*\|\s*string\s*\|\s*\(instance:\s*null\s*\|\s*([^)]*?)\)\s*=>\s*void\s*\|\s*RefObject\b/g,
            '$1',
        );

const compactSpaces = (t: string) => t.replace(/\s+/g, ' ').trim();

const normalizeCallbacks = (t: string) =>
    t
        .replace(/^\(\s*\((.*?)\)\s*\)$/s, '($1)')
        .replace(/\(\(\s*([^)]+?)\)\s*=>/g, '($1) =>')
        .replace(/\(\((.*?)\)\)/g, '($1)');

const collapseReactNode = (t: string) =>
    /string/.test(t) &&
    /number/.test(t) &&
    /boolean/.test(t) &&
    /null/.test(t) &&
    /ReactElement/.test(t) &&
    /ReactPortal/.test(t)
        ? 'ReactNode'
        : t;

const finalizeText = (t: string) =>
    compactSpaces(
        stripLegacyRef(
            normalizeCallbacks(
                collapseReactNode(
                    stripReactAndImports(dropUndefinedAndBools(compressCssUnions(mapCSS(t)))),
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

/* -------------------------------------------------------------------------- */
/* Internal/External classification + alias                                   */
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

/** classify: internal if in /packages/ or node_modules/@chayns-components/ */
const isInternalSourceFile = (sf: SourceFile | undefined): boolean => {
    if (!sf) return false;
    const filePath = sf.getFilePath().replace(/\\/g, '/');
    return (
        /\/packages\/[^/]+\/src\//.test(filePath) ||
        /\/packages\/core\/src\/types\//.test(filePath) ||
        /node_modules\/@chayns-components\//.test(filePath)
    );
};

/* -------------------------------------------------------------------------- */
/* Candidate extraction from type text                                        */
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
    return name === 'Window' || name === 'Document' || name === 'Navigator';
};

const collectNamesFromTypeText = (text: string): string[] => {
    if (!text) return [];
    const names = new Set<string>();

    // Plain identifiers
    for (const m of text.matchAll(/\b[A-Z][A-Za-z0-9_]*\b/g)) {
        const id = m[0];
        if (!shouldIgnoreName(id)) names.add(id);
    }
    // Generic/array shapes: Type[...]
    for (const m of text.matchAll(/\b([A-Z][A-Za-z0-9_]*)\s*\[/g)) {
        const id = m[1];
        if (!shouldIgnoreName(id)) names.add(id);
    }
    // Namespaced: Namespace.Member
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

/** global declaration cache */
const _declCache = new Map<string, InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration>();

/** find declaration anywhere in project (direct + re-exports + aliasMap) */
const findDeclaredNode = (
    name: string,
): InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | null => {
    if (_declCache.has(name)) {
        return _declCache.get(name) ?? null;
    }

    let decl: InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | null = null;

    for (const sf of project.getSourceFiles()) {
        const i = sf.getInterface(name);
        if (i) {
            decl = i;
            break;
        }
        const t = sf.getTypeAlias(name);
        if (t) {
            decl = t;
            break;
        }
        const e = sf.getEnum(name);
        if (e) {
            decl = e;
            break;
        }
    }

    if (!decl) {
        for (const sf of project.getSourceFiles()) {
            const sym = sf.getExportSymbols().find((s) => s.getName() === name);
            const d = sym?.getDeclarations()?.[0];
            if (
                d &&
                (Node.isInterfaceDeclaration(d) ||
                    Node.isTypeAliasDeclaration(d) ||
                    Node.isEnumDeclaration(d))
            ) {
                decl = d as any;
                break;
            }
        }
    }

    if (!decl) {
        for (const [orig, alias] of aliasMap.entries()) {
            if (alias === name) {
                decl = findDeclaredNode(orig);
                break;
            }
        }
    }

    _declCache.set(name, decl ?? null);
    return decl;
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
            const text = pretty(pt, bag);
            return `  ${p.getName()}${opt}: ${text};`;
        })
        .join('\n')}\n}`;

const renderAlias = (t: TypeAliasDeclaration, bag: TypesBag) => pretty(t.getType(), bag);

/** resolve from a declaration node (internal only) and register into bag */
const resolveFromDeclaration = (decl: Node, bag: TypesBag): string | null => {
    const sf = decl.getSourceFile();
    const internal = isInternalSourceFile(sf);
    if (!internal) return null;

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

/** deeply collect referenced types from a Type */
const ensureCollectType = (t: Type, bag: TypesBag, seen = new Set<Type>()) => {
    if (!t || seen.has(t)) return;
    seen.add(t);

    const sym = t.getSymbol();
    const decl = sym?.getDeclarations()?.[0];
    const name = sym?.getName?.();

    if (name === '__type') {
        const aliasSym = t.getAliasSymbol?.();
        if (aliasSym) {
            const aliasName = aliasSym.getName();
            resolveNamedRecursive(aliasName, bag);
        }
    }

    // TypeReference → prefer declaration path
    if ((t as any).isTypeReference?.()) {
        const refName = sym?.getName();
        if (decl && isInternalSourceFile(decl.getSourceFile())) {
            resolveFromDeclaration(decl, bag);
        } else if (refName) {
            resolveNamedRecursive(refName, bag);
        }
        for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag, seen);
        return;
    }

    // Array
    if (t.isArray()) {
        const et = t.getArrayElementType();
        if (et) ensureCollectType(et, bag, seen);
        return;
    }

    // Union/Intersection
    if (t.isUnion() || t.isIntersection()) {
        for (const ut of t.getUnionTypes?.() ?? t.getIntersectionTypes?.() ?? []) {
            ensureCollectType(ut, bag, seen);
        }
        return;
    }

    // Callable
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

    // Text fallback (only resolve names we can really find)
    const text = t.getText();
    for (const n of collectNamesFromTypeText(text)) {
        const found = findDeclaredNode(n);
        if (found) resolveNamedRecursive(n, bag);
    }
};

/** resolve a named custom type (type/interface/enum) recursively */
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
        return;
    }

    // --- Interface ---
    if (Node.isInterfaceDeclaration(decl)) {
        addType(bag, display, renderInterface(decl, bag));
        for (const prop of decl.getProperties()) ensureCollectType(prop.getType(), bag);
        return;
    }

    // --- TypeAlias ---
    if (Node.isTypeAliasDeclaration(decl)) {
        const aliasType = decl.getType();
        const aliasText = aliasType.getText();

        // handle aliases like "type A = B;" or "__type"
        if (/^__type$/.test(aliasText)) {
            const resolved = aliasType.getAliasSymbol?.()?.getName();
            if (resolved && resolved !== name) {
                resolveNamedRecursive(resolved, bag);
                return;
            }
        }

        // follow direct alias references
        const targetNameMatch = aliasText.match(/\b[A-Z][A-Za-z0-9_]+\b/);
        if (targetNameMatch && targetNameMatch[0] !== name) {
            const next = targetNameMatch[0];
            const found = findDeclaredNode(next);
            if (found) {
                resolveNamedRecursive(next, bag);
                return;
            }
        }

        addType(bag, display, renderAlias(decl, bag));
        ensureCollectType(aliasType, bag);
        return;
    }
};

/** collapse enum member unions to enum name if possible */
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
    if (!HANDLER_ALIASES.includes(name)) return null;
    const args = t.getAliasTypeArguments?.() ?? [];
    return args.length ? `${name}<${args.map((a) => pretty(a, new Map())).join(', ')}>` : name;
};

/** pretty-print with resolution & collection */
const pretty = (t: Type, bag: TypesBag): string => {
    if (!t) return 'unknown';

    const sym = t.getSymbol();
    const name = sym?.getName();

    if (name === '__type') {
        const aliasSym = t.getAliasSymbol?.();
        if (aliasSym) {
            const aliasName = aliasSym.getName();
            resolveNamedRecursive(aliasName, bag);
            return aliasMap.get(aliasName) ?? aliasName;
        }
        return 'unknown';
    }

    // external types to leave as-is (do not collect)
    if (name) {
        if (EXTERNALS.has(name)) return name;

        // resolve aliases and internal symbols
        resolveNamedRecursive(name, bag);
        return aliasMap.get(name) ?? name;
    }

    // handler aliases like ChangeEventHandler<HTMLInputElement>
    const aliasHandler = getReactHandlerAlias(t);
    if (aliasHandler) {
        return aliasHandler;
    }

    const rawText = t.getText(undefined, TypeFormatFlags.NoTruncation).trim();
    if (/^(keyof|typeof)\b/.test(rawText)) {
        return rawText;
    }

    // TypeReference
    if ((t as any).isTypeReference?.()) {
        const refSym = t.getSymbol();
        const refName = refSym?.getName();
        if (refName && !EXTERNALS.has(refName)) {
            resolveNamedRecursive(refName, bag);
        }
        for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag);
        return aliasMap.get(refName ?? '') ?? refName ?? rawText;
    }

    // Array
    if (t.isArray()) {
        const et = t.getArrayElementType();
        return `${pretty(et ?? t, bag)}[]`;
    }

    // Unions/Intersections
    if (t.isUnion() || t.isIntersection()) {
        const collapsed = tryCollapseEnumUnionToName(t, bag);
        if (collapsed) return collapsed;
        const parts = (t.isUnion() ? t.getUnionTypes() : t.getIntersectionTypes()).map((x) => {
            ensureCollectType(x, bag);
            return pretty(x, bag);
        });
        return finalizeText(parts.join(t.isUnion() ? ' | ' : ' & '));
    }

    // Functions
    const sigs = t.getCallSignatures();
    if (sigs.length > 0) {
        const s = sigs[0];
        const params = s.getParameters().map((p) => {
            const d = p.getDeclarations()?.[0];
            const pt = d ? d.getType() : p.getTypeAtLocation(d ?? (p as any));
            ensureCollectType(pt, bag);
            return `${p.getName()}: ${pretty(pt, bag)}`;
        });
        const ret = s.getReturnType();
        ensureCollectType(ret, bag);
        return `${params.length ? `(${params.join(', ')})` : '()'} => ${pretty(ret, bag)}`;
    }

    // Named symbols
    if (name && !EXTERNALS.has(name)) {
        resolveNamedRecursive(name, bag);
        return aliasMap.get(name) ?? name;
    }

    // Fallback textual
    const text = finalizeText(applyAliases(t.getText()));
    for (const n of collectNamesFromTypeText(text)) resolveNamedRecursive(n, bag);
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

            // prefer declared type node text (keeps alias names and handler aliases),
            // but ensure we collect referenced types via actual type.
            const actualType = decl.getType();
            ensureCollectType(actualType, bag);

            const declaredNode = (decl as any).getTypeNode?.();
            let displayText = finalizeText(
                applyAliases(declaredNode?.getText?.() ?? pretty(actualType, bag)),
            );

            if (displayText === 'VoidFunction') displayText = '() => void';

            // textual candidates (when TS flattens unions/aliases)
            for (const n of collectNamesFromTypeText(displayText)) resolveNamedRecursive(n, bag);

            // collapse "Enum.Member | Enum.Member | ..." to "Enum"
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

/** try to infer ref type from forwardRef(...) */
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

/** drop &RefAttributes<R> part from P & RefAttributes<R> */
const stripRefAttributesFromProps = (t: Type): Type => {
    if (!t.isIntersection()) return t;
    const parts = t.getIntersectionTypes() ?? [];
    const kept = parts.filter((p) => {
        const sym = p.getSymbol();
        if (!sym) return true;
        const nm = sym.getName();
        if (nm === 'RefAttributes') return false;
        return !/^RefAttributes<.+>$/.test(p.getText());
    });
    return kept[0] ?? t;
};

/** unwrap component props type from React.* wrappers */
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

/** prefer props from function parameter when available (better for generics) */
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
    ALREADY_EXPANDED = new Set<string>(); // avoid cross-component pollution

    const decls = getExportDecls(exp);
    if (!decls.length) return null;

    const compType = decls[0].getType();
    const typesBag: TypesBag = new Map();

    // props type: function param first, fallback to unwrapped component type
    let propsType: Type | null = null;
    for (const d of decls) {
        propsType = tryGetPropsFromFunctionParam(d);
        if (propsType) break;
    }
    if (!propsType) propsType = unwrapComponentPropsType(compType);

    const props = propsType ? extractProps(propsType, typesBag) : [];

    // forwardRef ref type
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

uploadDocs();

/* -------------------------------------------------------------------------- */
/* Debug: report missing internal types                                       */
/* -------------------------------------------------------------------------- */

if (DEBUG_MISSING_TYPES && missingTypes.size > 0) {
    const domEl = (n: string) => /^HTML[A-Za-z0-9]*Element$/.test(n);
    const missing = [...missingTypes].filter(
        (n) =>
            !GLOBALS.has(n) &&
            !PRIMS.has(n) &&
            !IGNORED_TYPES.has(n) &&
            n !== '__type' &&
            !domEl(n),
    );
    if (missing.length) {
        console.warn(
            '⚠️ Missing type(s) (referenced but not resolved locally):',
            [...new Set(missing)].sort().join(', '),
        );
    }
}
