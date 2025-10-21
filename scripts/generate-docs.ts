/* eslint-disable */
// @ts-nocheck
/**
 * ──────────────────────────────────────────────────────────────────────────────
 * 🧠 Docs/Types Generator for a Lerna/Monorepo (ts-morph)
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
    Project,
    Node,
    Type,
    PropertySignature,
    InterfaceDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    SourceFile,
    TypeFormatFlags,
} from 'ts-morph';
import type { GenerateTypesConfig } from '../docs.config.ts';

/* ──────────────────────────────────────────────────────────────────────────────
   🔧 GLOBAL CONSTANTS
   All configuration constants and reusable sets are declared here.
   ────────────────────────────────────────────────────────────────────────────── */

const PRIMITIVE_TYPES = new Set([
    'string',
    'number',
    'boolean',
    'null',
    'any',
    'void',
    'never',
    'unknown',
]);
const GLOBAL_TYPES = new Set([
    'ReactNode',
    'ReactElement',
    'CSSProperties',
    'Element',
    'HTMLElement',
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

const BUILTIN_UTILITY_TYPES = new Set([
    'Record',
    'Partial',
    'Required',
    'Pick',
    'Omit',
    'Readonly',
    'Exclude',
    'Extract',
]);

const BUILTIN_EVENT_TYPES = new Set([
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

const BUILTIN_DOM_REGEX = /^HTML[A-Za-z0-9]*Element$/;

/* ──────────────────────────────────────────────────────────────────────────────
   🧩 BOOTSTRAPPING & CONFIGURATION
   Loads configuration, initializes ts-morph project and collects all packages.
   ────────────────────────────────────────────────────────────────────────────── */

// Resolve current directory
const __FILENAME = fileURLToPath(import.meta.url);
const __DIRNAME = path.dirname(__FILENAME);

// Load docs.config.ts
const { default: RAW_CONFIG } = await import(
    pathToFileURL(path.resolve(__DIRNAME, '../docs.config.ts')).href
);
const CONFIG = RAW_CONFIG as GenerateTypesConfig;

// Initialize ts-morph Project
const PROJECT = new Project({
    tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
});

// Collect package versions (used for filters)
const PACKAGE_VERSIONS: Record<string, string> = {};
for (const pkg of CONFIG.packages) {
    const pkgJsonPath = path.resolve(CONFIG.rootDir, pkg, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
        try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
            if (pkgJson.version) PACKAGE_VERSIONS[pkg] = pkgJson.version;
        } catch {
            // Ignore invalid JSON
        }
    }
}

// Add all source files from each subpackage
for (const pkg of CONFIG.packages) {
    const srcDir = path.resolve(CONFIG.rootDir, pkg, 'src');
    if (!fs.existsSync(srcDir)) continue;

    PROJECT.addSourceFilesAtPaths([
        `${srcDir}/**/*.ts`,
        `${srcDir}/**/*.tsx`,
        `${srcDir}/**/*.d.ts`,
    ]);
}

// Eagerly add internal dependencies (@chayns-components/*)
for (const sf of PROJECT.getSourceFiles()) {
    for (const imp of sf.getImportDeclarations()) {
        const spec = imp.getModuleSpecifierValue();
        if (spec.startsWith('@chayns-components/')) {
            const subPkg = spec.replace('@chayns-components/', '');
            const subSrc = path.resolve(CONFIG.rootDir, subPkg, 'src');
            if (fs.existsSync(subSrc)) {
                PROJECT.addSourceFilesAtPaths([
                    `${subSrc}/**/*.ts`,
                    `${subSrc}/**/*.tsx`,
                    `${subSrc}/**/*.d.ts`,
                ]);
            }
        }
    }
}

// Attach versions to config filters
CONFIG.filters = CONFIG.filters.map((f) => {
    const version = PACKAGE_VERSIONS[f.id];
    return version ? { ...f, version } : f;
});

/* ──────────────────────────────────────────────────────────────────────────────
   🧰 NORMALIZATION & UTILITY FUNCTIONS
   Text normalization, type cleanup, React-specific adjustments and guards.
   ────────────────────────────────────────────────────────────────────────────── */

// Used to avoid redundant recursive expansion
let ALREADY_EXPANDED = new Set<string>();

// -----------------------------------------------------------------------------
//  Text normalization helpers
// -----------------------------------------------------------------------------

/** Convert "BackgroundColor" → "backgroundColor" */
const cssPropName = (n: string) => n.charAt(0).toLowerCase() + n.slice(1);

/** Map imported CSS property types to `CSSProperties[...]` */
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

/** Detect large CSS color unions to simplify them */
const looksLikeCssColorUnion = (t: string) =>
    /ActiveBorder|currentcolor|ThreeDLightShadow/.test(t) && t.length > 300;

/** Replace long CSS color unions with CSSProperties['color'] */
const compressCssUnions = (t: string) => (looksLikeCssColorUnion(t) ? `CSSProperties['color']` : t);

/** Drop redundant `undefined` and replace `false|true` → `boolean` */
const dropUndefinedAndBools = (t: string) =>
    t
        .replace(/\bundefined\s*\|\s*/g, '')
        .replace(/\s*\|\s*undefined\b/g, '')
        .replace(/\bfalse\s*\|\s*true\b/g, 'boolean');

/** Remove React. and import(...) prefixes */
const stripReactAndImports = (t: string) =>
    t.replace(/React\./g, '').replace(/import\(['"].*?['"]\)\./g, '');

/** Clean up legacy ref signatures */
const stripLegacyRef = (t: string) =>
    t
        .replace(/\bLegacyRef<(.+?)>/g, '$1')
        .replace(/\bRefObject<(.+?)>/g, '$1')
        .replace(
            /\bnull\s*\|\s*string\s*\|\s*\(instance:\s*null\s*\|\s*([^)]*?)\)\s*=>\s*void\s*\|\s*RefObject\b/g,
            '$1',
        );

/** Compress whitespace */
const compactSpaces = (t: string) => t.replace(/\s+/g, ' ').trim();

/** Normalize arrow-function callback syntax */
const normalizeCallbacks = (t: string) =>
    t
        .replace(/^\(\s*\((.*?)\)\s*\)$/s, '($1)')
        .replace(/\(\(\s*([^)]+?)\)\s*=>/g, '($1) =>')
        .replace(/\(\((.*?)\)\)/g, '($1)');

/** Collapse long ReactNode unions into ReactNode */
const collapseReactNode = (t: string) =>
    /string/.test(t) &&
    /number/.test(t) &&
    /boolean/.test(t) &&
    /null/.test(t) &&
    /ReactElement/.test(t) &&
    /ReactPortal/.test(t)
        ? 'ReactNode'
        : t;

/** Final text normalization pipeline */
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

// -----------------------------------------------------------------------------
//  Internal / External classification + alias map
// -----------------------------------------------------------------------------

const ALIAS_MAP = new Map<string, string>();

/**
 * Parse index.ts exports to detect `type { A as B }` and record aliases.
 */
const collectAliasesFromIndex = (sf: SourceFile) => {
    const raw = sf.getFullText().replace(/\s+/g, ' ');
    for (const m of raw.matchAll(/export\s+type\s*{([^}]*)}/g)) {
        const block = m[1];
        for (const mm of block.matchAll(/\b([\w\d_]+)\s+as\s+([\w\d_]+)/g))
            ALIAS_MAP.set(mm[1], mm[2]);
    }
    for (const m of raw.matchAll(/export\s*{([^}]*)}/g)) {
        const block = m[1];
        for (const mm of block.matchAll(/\btype\s+([\w\d_]+)\s+as\s+([\w\d_]+)/g))
            ALIAS_MAP.set(mm[1], mm[2]);
    }
};

// Collect aliases for each configured package
for (const pkg of CONFIG.packages) {
    const indexPath = path.resolve(CONFIG.rootDir, pkg, 'src/index.ts');
    if (!fs.existsSync(indexPath)) continue;
    const sf = PROJECT.addSourceFileAtPathIfExists(indexPath);
    if (sf) collectAliasesFromIndex(sf);
}

/** Apply alias replacements to type text */
const applyAliases = (text: string) => {
    let t = text;
    ALIAS_MAP.forEach((alias, orig) => {
        const re = new RegExp(`\\b${orig}\\b`, 'g');
        t = t.replace(re, alias);
    });
    return t;
};

/** Determine whether a file belongs to internal source packages */
const isInternalSourceFile = (sf: SourceFile | undefined): boolean => {
    if (!sf) return false;
    const filePath = sf.getFilePath().replace(/\\/g, '/');
    return (
        /\/packages\/[^/]+\/src\//.test(filePath) ||
        /\/packages\/core\/src\/types\//.test(filePath) ||
        /node_modules\/@chayns-components\//.test(filePath)
    );
};

// -----------------------------------------------------------------------------
//  Type text parsing helpers
// -----------------------------------------------------------------------------

/** Should this type name be ignored (built-in, global, primitive, DOM etc.) */
const shouldIgnoreName = (name: string) => {
    if (!name) return true;
    if (PRIMITIVE_TYPES.has(name) || GLOBAL_TYPES.has(name)) return true;
    if (BUILTIN_UTILITY_TYPES.has(name)) return true;
    if (BUILTIN_EVENT_TYPES.has(name)) return true;
    if (BUILTIN_DOM_REGEX.test(name)) return true;
    if (name === '__type') return true;
    return name === 'Window' || name === 'Document' || name === 'Navigator';
};

/** Collect all candidate type names from a type text */
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

/* ──────────────────────────────────────────────────────────────────────────────
   🔍 TYPE RESOLUTION & RECURSIVE COLLECTION
   Responsible for finding, rendering and collecting internal type declarations.
   ────────────────────────────────────────────────────────────────────────────── */

type TypesBag = Map<string, { name: string; type: string }>;

/** Register a new type into the bag (avoiding duplicates & built-ins) */
const addType = (bag: TypesBag, name: string, typeBody: string) => {
    if (!name) return;
    const display = ALIAS_MAP.get(name) ?? name;
    if (PRIMITIVE_TYPES.has(display) || GLOBAL_TYPES.has(display)) return;
    if (!bag.has(display)) bag.set(display, { name: display, type: typeBody });
};

/** Global cache for declarations (to speed up repeated lookups) */
const DECL_CACHE = new Map<string, InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration>();

/** Search for a declaration (interface/type/enum) anywhere in the project */
const findDeclaredNode = (
    name: string,
): InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | null => {
    if (DECL_CACHE.has(name)) return DECL_CACHE.get(name) ?? null;

    let decl: InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | null = null;

    // Try direct interface / type / enum in all source files
    for (const sf of PROJECT.getSourceFiles()) {
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

    // Try exported symbols (re-exports)
    if (!decl) {
        for (const sf of PROJECT.getSourceFiles()) {
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

    // Try alias map (A as B)
    if (!decl) {
        for (const [orig, alias] of ALIAS_MAP.entries()) {
            if (alias === name) {
                decl = findDeclaredNode(orig);
                break;
            }
        }
    }

    DECL_CACHE.set(name, decl ?? null);
    return decl;
};

/** Render an enum into a textual representation */
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

/** Render an interface into a textual representation */
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

/** Render a type alias using pretty printing */
const renderAlias = (t: TypeAliasDeclaration, bag: TypesBag) => pretty(t.getType(), bag);

/** Resolve a declaration node and register its internal types into the bag */
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

/** Recursively collect referenced types from a given Type */
const ensureCollectType = (t: Type, bag: TypesBag, seen = new Set<Type>()) => {
    if (!t || seen.has(t)) return;
    seen.add(t);

    const sym = t.getSymbol();
    const decl = sym?.getDeclarations()?.[0];
    const name = sym?.getName?.();

    // Handle anonymous __type alias
    if (name === '__type') {
        const aliasSym = t.getAliasSymbol?.();
        if (aliasSym) {
            const aliasName = aliasSym.getName();
            resolveNamedRecursive(aliasName, bag);
        }
    }

    // TypeReference
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

    // Array element type
    if (t.isArray()) {
        const et = t.getArrayElementType();
        if (et) ensureCollectType(et, bag, seen);
        return;
    }

    // Union / Intersection
    if (t.isUnion() || t.isIntersection()) {
        for (const ut of t.getUnionTypes?.() ?? t.getIntersectionTypes?.() ?? []) {
            ensureCollectType(ut, bag, seen);
        }
        return;
    }

    // Callable signatures
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

    // Generic type arguments
    for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag, seen);

    // Text fallback (resolve all detected type names)
    const text = t.getText();
    for (const n of collectNamesFromTypeText(text)) {
        const found = findDeclaredNode(n);
        if (found) resolveNamedRecursive(n, bag);
    }
};

/** Recursively resolve a named custom type (interface / alias / enum) */
const resolveNamedRecursive = (name: string, bag: TypesBag) => {
    const display = ALIAS_MAP.get(name) ?? name;
    if (!display || PRIMITIVE_TYPES.has(display) || GLOBAL_TYPES.has(display)) return;
    if (shouldIgnoreName(display)) return;
    if (ALREADY_EXPANDED.has(display)) return;

    const decl = findDeclaredNode(display);
    if (!decl) return;

    const sf = decl.getSourceFile();
    if (!isInternalSourceFile(sf)) return;

    ALREADY_EXPANDED.add(display);
    if (bag.has(display)) return;

    // Enum
    if (Node.isEnumDeclaration(decl)) {
        addType(bag, display, renderEnum(decl));
        return;
    }

    // Interface
    if (Node.isInterfaceDeclaration(decl)) {
        addType(bag, display, renderInterface(decl, bag));
        for (const prop of decl.getProperties()) ensureCollectType(prop.getType(), bag);
        return;
    }

    // Type alias
    if (Node.isTypeAliasDeclaration(decl)) {
        const aliasType = decl.getType();
        const aliasText = aliasType.getText();

        // Handle alias like `type A = __type`
        if (/^__type$/.test(aliasText)) {
            const resolved = aliasType.getAliasSymbol?.()?.getName();
            if (resolved && resolved !== name) {
                resolveNamedRecursive(resolved, bag);
                return;
            }
        }

        // Follow direct alias references
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

/** Collapse enum member unions like Enum.A | Enum.B → Enum */
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
        return ALIAS_MAP.get(enumName) ?? enumName;
    }

    return null;
};

/** Detect React handler aliases like ChangeEventHandler<HTMLInputElement> */
const getReactHandlerAlias = (t: Type): string | null => {
    const symbol = t.getAliasSymbol?.();
    if (!symbol) return null;
    const name = symbol.getName();
    if (!HANDLER_ALIASES.includes(name)) return null;
    const args = t.getAliasTypeArguments?.() ?? [];
    return args.length ? `${name}<${args.map((a) => pretty(a, new Map())).join(', ')}>` : name;
};

/** Pretty-print any Type (recursive, alias-aware) */
const pretty = (t: Type, bag: TypesBag): string => {
    if (!t) return 'unknown';

    const sym = t.getSymbol();
    const name = sym?.getName();

    if (name === '__type') {
        const aliasSym = t.getAliasSymbol?.();
        if (aliasSym) {
            const aliasName = aliasSym.getName();
            resolveNamedRecursive(aliasName, bag);
            return ALIAS_MAP.get(aliasName) ?? aliasName;
        }
        return 'unknown';
    }

    if (name && EXTERNALS.has(name)) return name;

    // Resolve aliases and internal symbols
    if (name) {
        resolveNamedRecursive(name, bag);
        return ALIAS_MAP.get(name) ?? name;
    }

    // React event handler aliases
    const aliasHandler = getReactHandlerAlias(t);
    if (aliasHandler) return aliasHandler;

    const rawText = t.getText(undefined, TypeFormatFlags.NoTruncation).trim();
    if (/^(keyof|typeof)\b/.test(rawText)) return rawText;

    // TypeReference
    if ((t as any).isTypeReference?.()) {
        const refSym = t.getSymbol();
        const refName = refSym?.getName();
        if (refName && !EXTERNALS.has(refName)) {
            resolveNamedRecursive(refName, bag);
        }
        for (const a of t.getTypeArguments?.() ?? []) ensureCollectType(a, bag);
        return ALIAS_MAP.get(refName ?? '') ?? refName ?? rawText;
    }

    // Array
    if (t.isArray()) {
        const et = t.getArrayElementType();
        return `${pretty(et ?? t, bag)}[]`;
    }

    // Unions / Intersections
    if (t.isUnion() || t.isIntersection()) {
        const collapsed = tryCollapseEnumUnionToName(t, bag);
        if (collapsed) return collapsed;
        const parts = (t.isUnion() ? t.getUnionTypes() : t.getIntersectionTypes()).map((x) => {
            ensureCollectType(x, bag);
            return pretty(x, bag);
        });
        return finalizeText(parts.join(t.isUnion() ? ' | ' : ' & '));
    }

    // Function signatures
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

    // Fallback textual
    const text = finalizeText(applyAliases(t.getText()));
    for (const n of collectNamesFromTypeText(text)) resolveNamedRecursive(n, bag);
    return text;
};
