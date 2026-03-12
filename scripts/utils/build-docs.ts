import fs from 'fs';
import path from 'path';
import process from 'process';
import { GenerateTypesConfig } from '../../docs.config';
import { Node, Project, TypeFormatFlags } from 'ts-morph';
import type {
    ArrowFunction,
    ExportSpecifier,
    FunctionDeclaration,
    FunctionExpression,
    Node as MorphNode,
    SourceFile,
    Symbol as MorphSymbol,
    Type,
} from 'ts-morph';
import type {
    BuildDocsComponent,
    BuildDocsFilter,
    BuildDocsOutput,
    BuildDocsProp,
} from '../types/build-docs';
import { script } from './logger';

const configPath = path.resolve(__dirname, '../../docs.config.ts');
const configModule = require(configPath) as {
    default?: GenerateTypesConfig;
} & Partial<GenerateTypesConfig>;
const config = (configModule.default ?? configModule) as GenerateTypesConfig;
const OUTPUT_FILE_PATH = path.resolve(process.cwd(), 'dist/docs.json');

/**
 * Creates a dedicated ts-morph project for docs generation.
 */
const createProject = (): Project =>
    new Project({
        skipAddingFilesFromTsConfig: true,
        tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
    });

/**
 * Loads all package source files into the project.
 */
const addPackageSourceFiles = (project: Project): void => {
    config.packages.forEach((packageName) => {
        const packageSourcePath = path.resolve(config.rootDir, packageName, 'src');

        if (!fs.existsSync(packageSourcePath)) {
            script.warn(`Skipping package "${packageName}" because no src directory was found.`);
            return;
        }

        project.addSourceFilesAtPaths([
            `${packageSourcePath}/**/*.ts`,
            `${packageSourcePath}/**/*.tsx`,
            `${packageSourcePath}/**/*.d.ts`,
        ]);
    });
};

/**
 * Reads package versions and enriches the configured filters.
 */
const getFilters = (): BuildDocsFilter[] =>
    config.filters.map((filter) => {
        const packageJsonPath = path.resolve(config.rootDir, filter.id, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            return filter;
        }

        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {
                version?: string;
            };

            return packageJson.version ? { ...filter, version: packageJson.version } : filter;
        } catch {
            script.warn(`Could not read version from ${packageJsonPath}.`);
            return filter;
        }
    });

/**
 * Returns the docs example source for a component when available.
 */
const getComponentDocsCode = (packagePath: string, componentName: string): string | undefined => {
    const docsFilePath = path.resolve(packagePath, 'docs', `${componentName}.docs.tsx`);

    if (!fs.existsSync(docsFilePath)) {
        return undefined;
    }

    return fs.readFileSync(docsFilePath, 'utf8');
};

/**
 * Resolves the declaration node that represents the component implementation.
 */
const getComponentDeclaration = (componentSymbol: MorphSymbol): MorphNode | undefined => {
    const declarations = componentSymbol.getDeclarations();

    return declarations[0];
};

/**
 * Resolves the component render function declaration from supported declaration shapes.
 */
const getComponentFunctionDeclaration = (
    declaration: MorphNode | undefined,
): ArrowFunction | FunctionDeclaration | FunctionExpression | undefined => {
    if (!declaration) {
        return undefined;
    }

    if (Node.isFunctionDeclaration(declaration)) {
        return declaration;
    }

    if (Node.isVariableDeclaration(declaration)) {
        const initializer = declaration.getInitializer();

        if (!initializer) {
            return undefined;
        }

        if (Node.isArrowFunction(initializer) || Node.isFunctionExpression(initializer)) {
            return initializer;
        }

        if (Node.isCallExpression(initializer)) {
            const firstArgument = initializer.getArguments()[0];

            if (
                firstArgument &&
                (Node.isArrowFunction(firstArgument) || Node.isFunctionExpression(firstArgument))
            ) {
                return firstArgument;
            }
        }
    }

    return undefined;
};

/**
 * Returns a clean string representation for a prop type.
 */
const formatTypeText = (type: Type): string =>
    type
        .getText(undefined, TypeFormatFlags.NoTruncation)
        .replace(/React\./g, '')
        .replace(/import\(['"].*?['"]\)\./g, '')
        .replace(/\s+/g, ' ')
        .trim();

/**
 * Returns whether a prop symbol should be treated as optional.
 */
const isOptionalProp = (propertySymbol: MorphSymbol): boolean =>
    propertySymbol.getDeclarations().some((declaration) => {
        if (Node.isPropertySignature(declaration) || Node.isPropertyDeclaration(declaration)) {
            return declaration.hasQuestionToken();
        }

        if (Node.isParameterDeclaration(declaration)) {
            return declaration.isOptional();
        }

        return false;
    });

/**
 * Returns the first JSDoc comment found for a prop declaration.
 */
const getPropDescription = (propertySymbol: MorphSymbol): string | undefined => {
    const declaration = propertySymbol.getDeclarations()[0];

    if (!declaration) {
        return undefined;
    }

    if (!('getJsDocs' in declaration) || typeof declaration.getJsDocs !== 'function') {
        return undefined;
    }

    const jsDoc = declaration.getJsDocs()[0];
    const comment = jsDoc?.getComment();

    return typeof comment === 'string' ? comment : undefined;
};

/**
 * Extracts component props from the first function parameter.
 */
const getComponentProps = (
    componentFunction: ArrowFunction | FunctionDeclaration | FunctionExpression | undefined,
): BuildDocsProp[] => {
    if (!componentFunction) {
        return [];
    }

    const parameter = componentFunction.getParameters()[0];

    if (!parameter) {
        return [];
    }

    const propsType = parameter.getType();
    const properties = propsType.getApparentProperties();

    return properties
        .filter((propertySymbol: MorphSymbol) => propertySymbol.getName() !== 'key')
        .map((propertySymbol: MorphSymbol) => {
            const declaration =
                propertySymbol.getValueDeclaration() ??
                propertySymbol.getDeclarations()[0] ??
                parameter;
            const propertyType = propertySymbol.getTypeAtLocation(declaration);
            const description = getPropDescription(propertySymbol);
            const prop: BuildDocsProp = {
                name: propertySymbol.getName(),
                required: !isOptionalProp(propertySymbol),
                type: formatTypeText(propertyType),
            };

            if (description) {
                prop.description = description;
            }

            return prop;
        })
        .sort((left: BuildDocsProp, right: BuildDocsProp) => left.name.localeCompare(right.name));
};

/**
 * Resolves a component symbol from an index export specifier.
 */
const getComponentSymbolFromExportSpecifier = (
    exportSpecifier: ExportSpecifier,
): MorphSymbol | undefined => {
    const exportedName = exportSpecifier.getAliasNode()?.getText();
    const moduleSourceFile = exportSpecifier.getExportDeclaration().getModuleSpecifierSourceFile();

    if (!exportedName || !moduleSourceFile) {
        return undefined;
    }

    const defaultExportSymbol = moduleSourceFile.getDefaultExportSymbol();

    if (defaultExportSymbol) {
        return defaultExportSymbol;
    }

    return moduleSourceFile.getExportSymbols().find((symbol) => symbol.getName() === exportedName);
};

/**
 * Builds a single documented component entry.
 */
const buildComponentDocs = (
    componentName: string,
    componentSymbol: MorphSymbol,
    packagePath: string,
): BuildDocsComponent => {
    const componentDeclaration = getComponentDeclaration(componentSymbol);
    const componentFunction = getComponentFunctionDeclaration(componentDeclaration);

    return {
        code: getComponentDocsCode(packagePath, componentName),
        name: componentName,
        props: getComponentProps(componentFunction),
        types: [],
    };
};

/**
 * Returns all component export specifiers that follow the public default-as pattern.
 */
const getComponentExportSpecifiers = (indexSourceFile: SourceFile): ExportSpecifier[] =>
    indexSourceFile
        .getExportDeclarations()
        .flatMap((exportDeclaration) => exportDeclaration.getNamedExports())
        .filter(
            (exportSpecifier) =>
                exportSpecifier.getName() === 'default' && Boolean(exportSpecifier.getAliasNode()),
        );

/**
 * Builds docs for a single package.
 */
const buildPackageDocs = (
    indexSourceFile: SourceFile,
    packageName: string,
): BuildDocsComponent[] => {
    const packagePath = path.resolve(config.rootDir, packageName);

    return getComponentExportSpecifiers(indexSourceFile)
        .map((exportSpecifier) => {
            const componentName = exportSpecifier.getAliasNode()?.getText();
            const componentSymbol = getComponentSymbolFromExportSpecifier(exportSpecifier);

            if (!componentName || !componentSymbol) {
                return null;
            }

            return buildComponentDocs(componentName, componentSymbol, packagePath);
        })
        .filter((component): component is BuildDocsComponent => Boolean(component))
        .sort((left, right) => left.name.localeCompare(right.name));
};

/**
 * Builds the full docs output structure and writes it to disk.
 */
export const buildDocs = async (): Promise<BuildDocsOutput> => {
    script.step('Building docs JSON...');

    const project = createProject();
    addPackageSourceFiles(project);

    const output: BuildDocsOutput = {
        filter: getFilters(),
        packages: {},
    };

    config.packages.forEach((packageName) => {
        const indexFilePath = path.resolve(config.rootDir, packageName, 'src/index.ts');

        if (!fs.existsSync(indexFilePath)) {
            script.warn(
                `Skipping package "${packageName}" because no src/index.ts file was found.`,
            );
            return;
        }

        const indexSourceFile = project.addSourceFileAtPathIfExists(indexFilePath);

        if (!indexSourceFile) {
            script.warn(
                `Skipping package "${packageName}" because the index file could not be loaded.`,
            );
            return;
        }

        const components = buildPackageDocs(indexSourceFile, packageName);

        if (components.length > 0) {
            output.packages[packageName] = components;
        }

        script.info(`Collected ${components.length} components for "${packageName}".`);
    });

    fs.mkdirSync(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(output, null, 2), 'utf8');

    script.success(`Wrote docs JSON to ${OUTPUT_FILE_PATH}.`);

    return output;
};
