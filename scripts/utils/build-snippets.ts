import fs from 'fs';
import path from 'path';
import process from 'process';
import { GenerateTypesConfig } from '../../docs.config';
import type { BuildDocsComponent } from '../types/build-docs';
import type {
    BuildSnippetsComponent,
    BuildSnippetsImports,
    BuildSnippetsOutput,
} from '../types/build-snippets';
import { buildDocs } from './build-docs';
import { script } from './logger';

const configPath = path.resolve(__dirname, '../../docs.config.ts');
const configModule = require(configPath) as {
    default?: GenerateTypesConfig;
} & Partial<GenerateTypesConfig>;
const config = (configModule.default ?? configModule) as GenerateTypesConfig;
const OUTPUT_FILE_PATH = path.resolve(process.cwd(), 'dist/snippets.json');
const PACKAGES_ROOT_PATH = path.resolve(process.cwd(), 'packages');
const PUBLIC_IDENTIFIER_PATTERN = /\b[A-Z][A-Za-z0-9_]*\b/g;
const JSX_IDENTIFIER_PATTERN = /<\/?\s*([A-Z][A-Za-z0-9_]*)/g;
const MEMBER_IDENTIFIER_PATTERN = /\b([A-Z][A-Za-z0-9_]*)\s*\./g;
const EXTERNAL_PUBLIC_EXPORTS: Record<string, string[]> = {
    'chayns-api': ['Language'],
};

type PackageExportMap = Map<string, string[]>;

/**
 * Returns the insertable snippet source for a component when available.
 */
const getComponentSnippetCode = (
    packageName: string,
    componentName: string,
): string | undefined => {
    const snippetFilePath = path.resolve(
        PACKAGES_ROOT_PATH,
        packageName,
        'docs',
        `${componentName}.snippets.tsx`,
    );

    if (!fs.existsSync(snippetFilePath)) {
        return undefined;
    }

    return fs.readFileSync(snippetFilePath, 'utf8').trim().replace(/;$/, '').trim();
};

/**
 * Returns public export names declared by a package index file.
 */
const getPackagePublicExports = (packageName: string): string[] => {
    const indexFilePath = path.resolve(PACKAGES_ROOT_PATH, packageName, 'src/index.ts');

    if (!fs.existsSync(indexFilePath)) {
        return [];
    }

    const indexCode = fs.readFileSync(indexFilePath, 'utf8');
    const exports = new Set<string>();
    const exportBlockPattern = /export\s+(?:type\s+)?\{([^}]+)\}/g;
    let exportBlockMatch: RegExpExecArray | null;

    while ((exportBlockMatch = exportBlockPattern.exec(indexCode)) !== null) {
        const exportBlock = exportBlockMatch[1];

        if (!exportBlock) {
            continue;
        }

        exportBlock
            .split(',')
            .map((rawExport) => rawExport.trim())
            .filter(Boolean)
            .forEach((rawExport) => {
                const exportPart = rawExport.replace(/^type\s+/, '').trim();
                const aliasMatch = /^(?:default|[A-Za-z0-9_]+)\s+as\s+([A-Za-z0-9_]+)$/.exec(
                    exportPart,
                );
                const aliasName = aliasMatch?.[1];

                exports.add(aliasName ?? exportPart);
            });
    }

    return Array.from(exports).sort((left, right) => left.localeCompare(right));
};

/**
 * Builds a map from public export names to package names.
 */
const getPackageExportMap = (): PackageExportMap => {
    const exportMap: PackageExportMap = new Map();

    config.packages.forEach((packageName) => {
        getPackagePublicExports(packageName).forEach((exportName) => {
            const packageNames = exportMap.get(exportName) ?? [];

            packageNames.push(packageName);
            exportMap.set(exportName, packageNames);
        });
    });

    Object.entries(EXTERNAL_PUBLIC_EXPORTS).forEach(([packageName, exportNames]) => {
        exportNames.forEach((exportName) => {
            const packageNames = exportMap.get(exportName) ?? [];

            packageNames.push(packageName);
            exportMap.set(exportName, packageNames);
        });
    });

    return exportMap;
};

/**
 * Returns identifiers from JSX tags, enum/static member access, and public PascalCase references.
 */
const getSnippetIdentifiers = (code: string): string[] => {
    const identifiers = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = JSX_IDENTIFIER_PATTERN.exec(code)) !== null) {
        const identifier = match[1];

        if (identifier) {
            identifiers.add(identifier);
        }
    }

    while ((match = MEMBER_IDENTIFIER_PATTERN.exec(code)) !== null) {
        const identifier = match[1];

        if (identifier) {
            identifiers.add(identifier);
        }
    }

    while ((match = PUBLIC_IDENTIFIER_PATTERN.exec(code)) !== null) {
        identifiers.add(match[0]);
    }

    return Array.from(identifiers).sort((left, right) => left.localeCompare(right));
};

/**
 * Resolves public package imports used by a raw snippet.
 */
const getSnippetImports = (
    code: string,
    packageName: string,
    packageExportMap: PackageExportMap,
): BuildSnippetsImports => {
    const imports: BuildSnippetsImports = {};

    getSnippetIdentifiers(code).forEach((identifier) => {
        const matchingPackageNames = packageExportMap.get(identifier);

        if (!matchingPackageNames || matchingPackageNames.length === 0) {
            return;
        }

        const resolvedPackageName = matchingPackageNames.includes(packageName)
            ? packageName
            : matchingPackageNames[0];

        if (!resolvedPackageName) {
            return;
        }

        const packageImports = imports[resolvedPackageName] ?? [];

        if (!packageImports.includes(identifier)) {
            packageImports.push(identifier);
            imports[resolvedPackageName] = packageImports.sort((left: string, right: string) =>
                left.localeCompare(right),
            );
        }
    });

    return Object.fromEntries(
        Object.entries(imports).sort(([left], [right]) => left.localeCompare(right)),
    );
};

/**
 * Converts documented components into snippet components by attaching raw snippet code.
 */
const buildPackageSnippets = (
    packageName: string,
    components: BuildDocsComponent[],
    packageExportMap: PackageExportMap,
): BuildSnippetsComponent[] =>
    components
        .map((component) => {
            const code = getComponentSnippetCode(packageName, component.name);

            if (!code) {
                return null;
            }

            return {
                code,
                imports: getSnippetImports(code, packageName, packageExportMap),
                name: component.name,
            };
        })
        .filter((component): component is BuildSnippetsComponent => Boolean(component));

/**
 * Builds the full snippets output structure and writes it to disk.
 */
export const buildSnippets = async (): Promise<BuildSnippetsOutput> => {
    script.step('Building snippets JSON...');

    const docsOutput = await buildDocs();
    const packageExportMap = getPackageExportMap();
    const output: BuildSnippetsOutput = {
        packages: {},
    };

    Object.entries(docsOutput.packages).forEach(([packageName, components]) => {
        const snippetComponents = buildPackageSnippets(packageName, components, packageExportMap);

        if (snippetComponents.length > 0) {
            output.packages[packageName] = snippetComponents;
        }

        script.info(`Collected ${snippetComponents.length} snippets for "${packageName}".`);
    });

    fs.mkdirSync(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(output, null, 2), 'utf8');

    script.success(`Wrote snippets JSON to ${OUTPUT_FILE_PATH}.`);

    return output;
};
