import fs from 'fs';
import path from 'path';
import process from 'process';
import { GenerateTypesConfig } from '../../docs.config';
import { Node, Project, SyntaxKind } from 'ts-morph';
import type { ExportAssignment, Expression, ObjectLiteralExpression, SourceFile } from 'ts-morph';
import type {
    BuildUsageCodeOptions,
    BuildUsageImportCodeOptions,
    BuildUsageJsxOptions,
    ComponentDocsOptions,
    ComponentStoryDocs,
    ExpressionOptions,
    GenerateAIDocsResult,
    JsonDocsFile,
    JsonObject,
    JsonValue,
    MergeArgsOptions,
    ObjectLiteralArgsData,
    ObjectLiteralArgsDataOptions,
    PackageDisplayNameOptions,
    PackageJsonData,
    PackageStoryDocs,
    PropertyNameOptions,
    RelativePathOptions,
    RenderImportSectionOptions,
    RenderPackageAIUsageOptions,
    StoryArgsOptions,
    StoryExample,
    StoryFilePathsOptions,
    StoryMeta,
    StoryMetaOptions,
} from '../types/build-ai-usage';
import { script } from './logger';

const configPath = path.resolve(__dirname, '../../docs.config.ts');
const configModule = require(configPath) as {
    default?: GenerateTypesConfig;
} & Partial<GenerateTypesConfig>;
const config = (configModule.default ?? configModule) as GenerateTypesConfig;
const DEFAULT_PACKAGE_PREFIX = '@chayns-components';
const DOCS_OUTPUT_PATH = path.resolve(__dirname, '../../dist/docs.json');

/**
 * Adds an identifier to the visited set to avoid cyclic resolution.
 */
const addVisitedIdentifier = (
    visitedIdentifiers: Set<string>,
    identifierName: string,
): Set<string> => {
    const nextVisitedIdentifiers = new Set<string>(visitedIdentifiers);
    nextVisitedIdentifiers.add(identifierName);

    return nextVisitedIdentifiers;
};

/**
 * Returns a normalized property name from an AST property name node.
 */
const getPropertyName = ({ propertyName }: PropertyNameOptions): string => {
    if (Node.isIdentifier(propertyName)) {
        return propertyName.getText();
    }

    if (Node.isStringLiteral(propertyName) || Node.isNumericLiteral(propertyName)) {
        return propertyName.getLiteralText();
    }

    return propertyName.getText();
};

/**
 * Unwraps TS wrapper expressions until the original expression is reached.
 */
const unwrapExpression = (expression: Expression): Expression => {
    let currentExpression = expression;

    while (true) {
        if (
            Node.isAsExpression(currentExpression) ||
            Node.isParenthesizedExpression(currentExpression) ||
            Node.isSatisfiesExpression(currentExpression) ||
            Node.isTypeAssertion(currentExpression)
        ) {
            currentExpression = currentExpression.getExpression();
            continue;
        }

        return currentExpression;
    }
};

/**
 * Resolves a variable initializer when an expression is a local identifier.
 */
const getVariableInitializer = ({ expression, sourceFile }: ExpressionOptions) => {
    if (!Node.isIdentifier(expression)) {
        return undefined;
    }

    return sourceFile.getVariableDeclaration(expression.getText())?.getInitializer();
};

/**
 * Resolves enum member initializers declared in the current source file.
 */
const getEnumMemberInitializer = ({ expression, sourceFile }: ExpressionOptions) => {
    if (!Node.isPropertyAccessExpression(expression)) {
        return undefined;
    }

    const enumExpression = expression.getExpression();
    if (!Node.isIdentifier(enumExpression)) {
        return undefined;
    }

    const enumDeclaration = sourceFile.getEnum(enumExpression.getText());
    const member = enumDeclaration?.getMember(expression.getName());

    return member?.getInitializer();
};

/**
 * Reads a string value from a TS expression if possible.
 */
const readStringExpression = ({
    expression,
    sourceFile,
    visitedIdentifiers = new Set<string>(),
}: ExpressionOptions): string | null => {
    const currentExpression = unwrapExpression(expression);

    if (
        Node.isStringLiteral(currentExpression) ||
        Node.isNoSubstitutionTemplateLiteral(currentExpression)
    ) {
        return currentExpression.getLiteralText();
    }

    if (
        Node.isBinaryExpression(currentExpression) &&
        currentExpression.getOperatorToken().getText() === '+'
    ) {
        const leftValue = readStringExpression({
            expression: currentExpression.getLeft(),
            sourceFile,
            visitedIdentifiers,
        });
        const rightValue = readStringExpression({
            expression: currentExpression.getRight(),
            sourceFile,
            visitedIdentifiers,
        });

        if (leftValue !== null && rightValue !== null) {
            return `${leftValue}${rightValue}`;
        }
    }

    if (Node.isIdentifier(currentExpression)) {
        const identifierName = currentExpression.getText();
        if (visitedIdentifiers.has(identifierName)) {
            return identifierName;
        }

        const initializer = getVariableInitializer({ expression: currentExpression, sourceFile });
        if (initializer) {
            return readStringExpression({
                expression: initializer,
                sourceFile,
                visitedIdentifiers: addVisitedIdentifier(visitedIdentifiers, identifierName),
            });
        }
    }

    const enumInitializer = getEnumMemberInitializer({ expression: currentExpression, sourceFile });
    if (enumInitializer) {
        return readStringExpression({
            expression: enumInitializer,
            sourceFile,
            visitedIdentifiers,
        });
    }

    return null;
};

/**
 * Serializes an expression back to TS code and resolves local indirections where possible.
 */
const expressionToCode = ({
    expression,
    sourceFile,
    visitedIdentifiers = new Set<string>(),
}: ExpressionOptions): string => {
    const currentExpression = unwrapExpression(expression);

    if (Node.isIdentifier(currentExpression)) {
        const identifierName = currentExpression.getText();
        if (visitedIdentifiers.has(identifierName)) {
            return identifierName;
        }

        const initializer = getVariableInitializer({ expression: currentExpression, sourceFile });
        if (initializer) {
            return expressionToCode({
                expression: initializer,
                sourceFile,
                visitedIdentifiers: addVisitedIdentifier(visitedIdentifiers, identifierName),
            });
        }
    }

    const enumInitializer = getEnumMemberInitializer({ expression: currentExpression, sourceFile });
    if (enumInitializer) {
        return expressionToCode({
            expression: enumInitializer,
            sourceFile,
            visitedIdentifiers,
        });
    }

    return currentExpression.getText();
};

/**
 * Converts an expression into a JSON-compatible value when possible.
 */
const expressionToJsonValue = ({
    expression,
    sourceFile,
    visitedIdentifiers = new Set<string>(),
}: ExpressionOptions): JsonValue => {
    const currentExpression = unwrapExpression(expression);

    if (
        Node.isStringLiteral(currentExpression) ||
        Node.isNoSubstitutionTemplateLiteral(currentExpression)
    ) {
        return currentExpression.getLiteralText();
    }

    if (Node.isNumericLiteral(currentExpression)) {
        return Number(currentExpression.getText());
    }

    if (currentExpression.getKind() === SyntaxKind.TrueKeyword) {
        return true;
    }

    if (currentExpression.getKind() === SyntaxKind.FalseKeyword) {
        return false;
    }

    if (currentExpression.getKind() === SyntaxKind.NullKeyword) {
        return null;
    }

    if (Node.isPrefixUnaryExpression(currentExpression)) {
        const operand = currentExpression.getOperand();
        if (Node.isNumericLiteral(operand)) {
            const numericValue = Number(operand.getText());

            return currentExpression.getOperatorToken() === SyntaxKind.MinusToken
                ? -numericValue
                : numericValue;
        }
    }

    if (Node.isArrayLiteralExpression(currentExpression)) {
        return currentExpression.getElements().map((element) =>
            expressionToJsonValue({
                expression: element,
                sourceFile,
                visitedIdentifiers,
            }),
        );
    }

    if (Node.isObjectLiteralExpression(currentExpression)) {
        return objectLiteralToArgsData({
            objectLiteral: currentExpression,
            sourceFile,
            visitedIdentifiers,
        }).json;
    }

    if (Node.isIdentifier(currentExpression)) {
        const identifierName = currentExpression.getText();
        if (visitedIdentifiers.has(identifierName)) {
            return identifierName;
        }

        const initializer = getVariableInitializer({ expression: currentExpression, sourceFile });
        if (initializer) {
            return expressionToJsonValue({
                expression: initializer,
                sourceFile,
                visitedIdentifiers: addVisitedIdentifier(visitedIdentifiers, identifierName),
            });
        }
    }

    const enumInitializer = getEnumMemberInitializer({ expression: currentExpression, sourceFile });
    if (enumInitializer) {
        return expressionToJsonValue({
            expression: enumInitializer,
            sourceFile,
            visitedIdentifiers,
        });
    }

    return currentExpression.getText();
};

/**
 * Resolves an expression to an object literal if it ultimately points to one.
 */
const resolveObjectLiteralExpression = ({
    expression,
    sourceFile,
    visitedIdentifiers = new Set<string>(),
}: ExpressionOptions): ObjectLiteralExpression | undefined => {
    const currentExpression = unwrapExpression(expression);

    if (Node.isObjectLiteralExpression(currentExpression)) {
        return currentExpression;
    }

    if (Node.isIdentifier(currentExpression)) {
        const identifierName = currentExpression.getText();
        if (visitedIdentifiers.has(identifierName)) {
            return undefined;
        }

        const initializer = getVariableInitializer({ expression: currentExpression, sourceFile });
        if (initializer) {
            return resolveObjectLiteralExpression({
                expression: initializer,
                sourceFile,
                visitedIdentifiers: addVisitedIdentifier(visitedIdentifiers, identifierName),
            });
        }
    }

    return undefined;
};

/**
 * Converts an object literal expression into JSON data and source snippets per prop.
 */
const objectLiteralToArgsData = ({
    objectLiteral,
    sourceFile,
    visitedIdentifiers = new Set<string>(),
}: ObjectLiteralArgsDataOptions): ObjectLiteralArgsData => {
    const json: JsonObject = {};
    const codeByProp: Record<string, string> = {};

    objectLiteral.getProperties().forEach((property) => {
        if (Node.isPropertyAssignment(property)) {
            const initializer = property.getInitializer();
            if (!initializer) {
                return;
            }

            const propertyName = getPropertyName({ propertyName: property.getNameNode() });
            json[propertyName] = expressionToJsonValue({
                expression: initializer,
                sourceFile,
                visitedIdentifiers,
            });
            codeByProp[propertyName] = expressionToCode({
                expression: initializer,
                sourceFile,
                visitedIdentifiers,
            });
            return;
        }

        if (Node.isShorthandPropertyAssignment(property)) {
            const propertyName = property.getName();
            json[propertyName] = expressionToJsonValue({
                expression: property.getNameNode(),
                sourceFile,
                visitedIdentifiers,
            });
            codeByProp[propertyName] = expressionToCode({
                expression: property.getNameNode(),
                sourceFile,
                visitedIdentifiers,
            });
            return;
        }

        if (Node.isSpreadAssignment(property)) {
            const spreadObjectLiteral = resolveObjectLiteralExpression({
                expression: property.getExpression(),
                sourceFile,
                visitedIdentifiers,
            });

            if (!spreadObjectLiteral) {
                return;
            }

            const spreadArgsData = objectLiteralToArgsData({
                objectLiteral: spreadObjectLiteral,
                sourceFile,
                visitedIdentifiers,
            });

            Object.assign(json, spreadArgsData.json);
            Object.assign(codeByProp, spreadArgsData.codeByProp);
        }
    });

    return {
        codeByProp,
        json,
    };
};

/**
 * Indents a multiline block for readable generated code.
 */
const indentBlock = (value: string, indentSize: number): string => {
    const indent = ' '.repeat(indentSize);

    return value
        .split(/\r?\n/)
        .map((line) => `${indent}${line}`)
        .join('\n');
};

/**
 * Builds a JSX prop line from the prop name and serialized value.
 */
const buildPropLine = (propertyName: string, propertyCode: string): string => {
    if (propertyCode === 'true') {
        return propertyName;
    }

    return `${propertyName}={${propertyCode}}`;
};

/**
 * Builds a formatted JSX children block.
 */
const buildChildrenBlock = (childrenCode: string): string => {
    if (!childrenCode.includes('\n')) {
        return `{${childrenCode}}`;
    }

    return ['{', indentBlock(childrenCode, 4), '}'].join('\n');
};

/**
 * Builds the generated React example component name for a story.
 */
const getExampleName = (storyName: string): string => `${storyName}Example`;

/**
 * Checks whether a value might contain JSX references that require an import.
 */
const canContainJsxReferences = (propertyCode: string): boolean =>
    !/^[\s]*['"`]/.test(propertyCode);

/**
 * Collects referenced component names from generated JSX props.
 */
const getReferencedComponentNames = (
    componentName: string,
    argsCodeByProp: Record<string, string>,
): string[] => {
    const referencedComponentNames = new Set<string>([componentName]);

    Object.values(argsCodeByProp).forEach((propertyCode) => {
        if (!canContainJsxReferences(propertyCode)) {
            return;
        }

        Array.from(propertyCode.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)).forEach((match) => {
            const referencedComponentName = match[1];
            if (referencedComponentName) {
                referencedComponentNames.add(referencedComponentName);
            }
        });
    });

    return Array.from(referencedComponentNames).sort((left, right) => left.localeCompare(right));
};

/**
 * Builds the public package import statement for a generated example.
 */
const buildUsageImportCode = ({
    argsCodeByProp,
    componentName,
    packageName,
}: BuildUsageImportCodeOptions): string => {
    const importComponentNames = getReferencedComponentNames(componentName, argsCodeByProp);

    return `import { ${importComponentNames.join(', ')} } from '@chayns-components/${packageName}';`;
};

/**
 * Builds JSX for a generated story example.
 */
const buildUsageJsx = ({ argsCodeByProp, componentName }: BuildUsageJsxOptions): string => {
    const { children, ...props } = argsCodeByProp;
    const propLines = Object.entries(props).map(([propertyName, propertyCode]) =>
        buildPropLine(propertyName, propertyCode),
    );

    if (children) {
        const openingTag = propLines.length
            ? [`<${componentName}`, indentBlock(propLines.join('\n'), 4), '>'].join('\n')
            : `<${componentName}>`;

        return [
            openingTag,
            indentBlock(buildChildrenBlock(children), 4),
            `</${componentName}>`,
        ].join('\n');
    }

    if (propLines.length > 0) {
        return [`<${componentName}`, indentBlock(propLines.join('\n'), 4), '/>'].join('\n');
    }

    return `<${componentName} />`;
};

/**
 * Builds a full runnable example file for a story.
 */
const buildUsageCode = ({
    argsCodeByProp,
    componentName,
    packageName,
    storyName,
}: BuildUsageCodeOptions): string => {
    const exampleName = getExampleName(storyName);
    const importCode = buildUsageImportCode({
        argsCodeByProp,
        componentName,
        packageName,
    });
    const jsxSnippet = buildUsageJsx({ argsCodeByProp, componentName });

    return [
        "import React from 'react';",
        importCode,
        '',
        `export const ${exampleName} = () => (`,
        indentBlock(jsxSnippet, 4),
        ');',
        '',
        `${exampleName}.displayName = '${exampleName}';`,
    ].join('\n');
};

/**
 * Builds a relative POSIX path regardless of the current OS.
 */
const getRelativePosixPath = ({ rootPath, targetPath }: RelativePathOptions): string =>
    path.relative(rootPath, targetPath).replace(/\\/g, '/');

/**
 * Escapes code fences in markdown snippets.
 */
const sanitizeCodeFence = (value: string): string => value.replace(/```/g, '``\\`');

/**
 * Formats a markdown code block.
 */
const formatCodeBlock = (value: string, language: string): string =>
    [`\`\`\`${language}`, sanitizeCodeFence(value), '\`\`\`'].join('\n');

/**
 * Formats a Storybook story name into a readable heading.
 */
const formatStoryName = (storyName: string): string =>
    storyName
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[-_]+/g, ' ')
        .trim();

/**
 * Escapes markdown table cells.
 */
const escapeTableCell = (value: string): string =>
    value.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br />');

/**
 * Returns a readable required label.
 */
const getRequiredLabel = (isRequired: boolean): string => (isRequired ? 'yes' : 'no');

/**
 * Returns a description for a documented component.
 */
const getComponentDescription = (
    componentDocs: ComponentStoryDocs,
    packageDocs: PackageStoryDocs,
): string =>
    componentDocs.description ??
    componentDocs.docs?.description ??
    `\`${componentDocs.componentName}\` is exported by \`${packageDocs.npmPackageName}\` and should be imported from the public package entry point.`;

/**
 * Returns the first available example for a component.
 */
const getPrimaryExample = (componentDocs: ComponentStoryDocs): StoryExample | null =>
    componentDocs.examples[0] ?? null;

/**
 * Renders the package import section.
 */
const renderImportSection = ({ packageDocs }: RenderImportSectionOptions): string => {
    const componentNames = Object.keys(packageDocs.components).sort((left, right) =>
        left.localeCompare(right),
    );

    if (componentNames.length === 0) {
        return formatCodeBlock(
            `import { ComponentName } from '${packageDocs.npmPackageName}';`,
            'ts',
        );
    }

    return formatCodeBlock(
        `import { ${componentNames.slice(0, 3).join(', ')} } from '${packageDocs.npmPackageName}';`,
        'ts',
    );
};

/**
 * Renders a typical usage example for a package.
 */
const renderTypicalUsage = (packageDocs: PackageStoryDocs): string => {
    const primaryComponentDocs = Object.keys(packageDocs.components)
        .sort((left, right) => left.localeCompare(right))
        .map((componentName) => packageDocs.components[componentName])
        .find((componentDocs): componentDocs is ComponentStoryDocs =>
            Boolean(componentDocs && getPrimaryExample(componentDocs)),
        );

    const primaryExample = primaryComponentDocs ? getPrimaryExample(primaryComponentDocs) : null;

    if (!primaryExample) {
        return 'No typical usage example is available yet.';
    }

    return formatCodeBlock(primaryExample.jsx, 'tsx');
};

/**
 * Builds package-level usage notes for a component.
 */
const getUsageHints = (
    componentDocs: ComponentStoryDocs,
    packageDocs: PackageStoryDocs,
): string[] => {
    const hints = [
        `Import \`${componentDocs.componentName}\` directly from \`${packageDocs.npmPackageName}\` instead of internal source paths.`,
    ];
    const requiredProps = (componentDocs.docs?.props ?? [])
        .filter((prop) => prop.required)
        .map((prop) => prop.name);

    if (componentDocs.examples.length > 0) {
        hints.push(
            'Start with one of the documented Storybook examples and adapt the props incrementally for your use case.',
        );
    }

    if (requiredProps.length > 0) {
        hints.push(
            `Pay special attention to required props: ${requiredProps.map((propName) => `\`${propName}\``).join(', ')}.`,
        );
    }

    return hints;
};

/**
 * Builds anti-pattern guidance for a component.
 */
const getAntiPatterns = (
    componentDocs: ComponentStoryDocs,
    packageDocs: PackageStoryDocs,
): string[] => {
    const antiPatterns = [
        `Avoid imports from internal paths such as \`${packageDocs.npmPackageName}/src/...\`; always use the public package export.`,
    ];

    if ((componentDocs.docs?.props ?? []).length > 0) {
        antiPatterns.push(
            'Avoid incomplete prop objects; follow the documented prop types and required fields.',
        );
    }

    return antiPatterns;
};

/**
 * Renders a markdown table with documented props.
 */
const renderProps = (componentDocs: ComponentStoryDocs): string => {
    const props = componentDocs.docs?.props ?? [];

    if (props.length === 0) {
        return 'No prop documentation available.';
    }

    return [
        '| name | type | required | description |',
        '| --- | --- | --- | --- |',
        ...props.map(
            (prop) =>
                `| \`${escapeTableCell(prop.name)}\` | \`${escapeTableCell(prop.type)}\` | ${getRequiredLabel(prop.required)} | ${escapeTableCell(prop.description ?? 'No description available.')} |`,
        ),
    ].join('\n');
};

/**
 * Renders a markdown list with additional documented types.
 */
const renderAdditionalTypes = (componentDocs: ComponentStoryDocs): string => {
    const types = componentDocs.docs?.types ?? [];

    if (types.length === 0) {
        return 'No additional exported types documented.';
    }

    return types.map((typeEntry) => `- \`${typeEntry.name}\` -> \`${typeEntry.type}\``).join('\n');
};

/**
 * Renders a single example section.
 */
const renderExample = (example: StoryExample): string =>
    [`#### ${formatStoryName(example.storyName)}`, '', formatCodeBlock(example.jsx, 'tsx')].join(
        '\n',
    );

/**
 * Renders the examples section for a component.
 */
const renderExamples = (componentDocs: ComponentStoryDocs): string => {
    if (componentDocs.examples.length === 0) {
        return 'No examples available.';
    }

    return componentDocs.examples.map(renderExample).join('\n\n');
};

/**
 * Renders an optional markdown list section.
 */
const renderOptionalSection = (title: string, items: string[]): string | null => {
    if (items.length === 0) {
        return null;
    }

    return [`### ${title}`, '', ...items.map((item) => `- ${item}`)].join('\n');
};

/**
 * Renders the full markdown section for a component.
 */
const renderComponentSection = (
    componentDocs: ComponentStoryDocs,
    packageDocs: PackageStoryDocs,
): string => {
    const primaryExample = getPrimaryExample(componentDocs);
    const usageHints = renderOptionalSection(
        'Usage Notes',
        getUsageHints(componentDocs, packageDocs),
    );
    const antiPatterns = renderOptionalSection(
        'Anti Patterns',
        getAntiPatterns(componentDocs, packageDocs),
    );
    const sections = [
        `## ${componentDocs.componentName}`,
        '',
        getComponentDescription(componentDocs, packageDocs),
        '',
        '### Import',
        '',
        formatCodeBlock(
            primaryExample?.importCode ??
                `import { ${componentDocs.componentName} } from '${packageDocs.npmPackageName}';`,
            'ts',
        ),
        '',
        '### Examples',
        '',
        renderExamples(componentDocs),
        '',
        '### Props',
        '',
        renderProps(componentDocs),
        '',
        '### Types',
        '',
        renderAdditionalTypes(componentDocs),
    ];

    if (usageHints) {
        sections.push('', usageHints);
    }

    if (antiPatterns) {
        sections.push('', antiPatterns);
    }

    return sections.join('\n');
};

/**
 * Renders the complete AI usage markdown for a package.
 */
const renderPackageAIUsage = ({ packageDocs }: RenderPackageAIUsageOptions): string => {
    const componentNames = Object.keys(packageDocs.components).sort((left, right) =>
        left.localeCompare(right),
    );
    const componentSections = componentNames.flatMap((componentName) => {
        const componentDocs = packageDocs.components[componentName];

        return componentDocs ? [renderComponentSection(componentDocs, packageDocs)] : [];
    });
    const componentList =
        componentNames.length > 1
            ? [
                  '## Components',
                  '',
                  ...componentNames.map((componentName) => `- \`${componentName}\``),
                  '',
              ]
            : [];

    return [
        `# ${packageDocs.npmPackageName}`,
        '',
        packageDocs.packageDescription,
        '',
        packageDocs.contentsDescription,
        '',
        '## Import',
        '',
        renderImportSection({ packageDocs }),
        '',
        '## Typical Usage',
        '',
        renderTypicalUsage(packageDocs),
        '',
        ...componentList,
        ...componentSections,
        '',
    ].join('\n');
};

/**
 * Loads docs.json when it is available.
 */
const getJsonDocs = (): JsonDocsFile | null => {
    if (!fs.existsSync(DOCS_OUTPUT_PATH)) {
        script.warn(
            `Generated docs file not found at ${DOCS_OUTPUT_PATH}. AI usage will be generated from stories only.`,
        );
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(DOCS_OUTPUT_PATH, 'utf8')) as JsonDocsFile;
    } catch (error) {
        script.error(`Invalid JSON in ${DOCS_OUTPUT_PATH}.`, error);
        throw error;
    }
};

/**
 * Returns all files in a directory tree.
 */
const getFilesRecursively = (directoryPath: string): string[] => {
    if (!fs.existsSync(directoryPath)) {
        return [];
    }

    return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((directoryEntry) => {
        const entryPath = path.resolve(directoryPath, directoryEntry.name);

        return directoryEntry.isDirectory() ? getFilesRecursively(entryPath) : [entryPath];
    });
};

/**
 * Returns all story file paths for the configured packages.
 */
const getStoryFilePaths = ({ packageNames, rootDir }: StoryFilePathsOptions): string[] =>
    packageNames.flatMap((packageName) => {
        const storiesDirectoryPath = path.resolve(rootDir, packageName, 'stories');

        return getFilesRecursively(storiesDirectoryPath).filter((filePath) =>
            filePath.endsWith('.stories.tsx'),
        );
    });

/**
 * Returns the object literal of the default export metadata.
 */
const getDefaultExportObjectLiteral = (
    sourceFile: SourceFile,
): ObjectLiteralExpression | undefined => {
    const exportAssignment = sourceFile.getStatements().find(Node.isExportAssignment);

    if (!exportAssignment) {
        return undefined;
    }

    const expression = unwrapExpression((exportAssignment as ExportAssignment).getExpression());

    return Node.isObjectLiteralExpression(expression) ? expression : undefined;
};

/**
 * Returns an object literal property by name.
 */
const getObjectLiteralProperty = (objectLiteral: ObjectLiteralExpression, propertyName: string) =>
    objectLiteral.getProperty(propertyName);

/**
 * Returns a string literal property value when it can be resolved.
 */
const getStringPropertyValue = (
    objectLiteral: ObjectLiteralExpression,
    propertyName: string,
    sourceFile: SourceFile,
): string | undefined => {
    const property = getObjectLiteralProperty(objectLiteral, propertyName);

    if (!property || !Node.isPropertyAssignment(property)) {
        return undefined;
    }

    const initializer = property.getInitializer();
    if (!initializer) {
        return undefined;
    }

    return readStringExpression({ expression: initializer, sourceFile }) ?? undefined;
};

/**
 * Returns the nested docs description text from Storybook parameters.
 */
const getNestedDescription = (
    metaObjectLiteral: ObjectLiteralExpression,
    sourceFile: SourceFile,
): string | null => {
    const parametersProperty = getObjectLiteralProperty(metaObjectLiteral, 'parameters');
    if (!parametersProperty || !Node.isPropertyAssignment(parametersProperty)) {
        return null;
    }

    const parametersInitializer = parametersProperty.getInitializer();
    if (!parametersInitializer) {
        return null;
    }

    const parametersExpression = unwrapExpression(parametersInitializer);
    if (!Node.isObjectLiteralExpression(parametersExpression)) {
        return null;
    }

    const docsProperty = getObjectLiteralProperty(parametersExpression, 'docs');
    if (!docsProperty || !Node.isPropertyAssignment(docsProperty)) {
        return null;
    }

    const docsInitializer = docsProperty.getInitializer();
    if (!docsInitializer) {
        return null;
    }

    const docsExpression = unwrapExpression(docsInitializer);
    if (!Node.isObjectLiteralExpression(docsExpression)) {
        return null;
    }

    const descriptionProperty = getObjectLiteralProperty(docsExpression, 'description');
    if (!descriptionProperty || !Node.isPropertyAssignment(descriptionProperty)) {
        return null;
    }

    const descriptionInitializer = descriptionProperty.getInitializer();
    if (!descriptionInitializer) {
        return null;
    }

    const descriptionExpression = unwrapExpression(descriptionInitializer);
    if (!Node.isObjectLiteralExpression(descriptionExpression)) {
        return null;
    }

    return getStringPropertyValue(descriptionExpression, 'component', sourceFile) ?? null;
};

/**
 * Returns meta args from the Storybook default export.
 */
const getMetaArgs = (
    metaObjectLiteral: ObjectLiteralExpression,
    sourceFile: SourceFile,
): ObjectLiteralArgsData => {
    const argsProperty = getObjectLiteralProperty(metaObjectLiteral, 'args');
    if (!argsProperty || !Node.isPropertyAssignment(argsProperty)) {
        return { codeByProp: {}, json: {} };
    }

    const argsInitializer = argsProperty.getInitializer();
    if (!argsInitializer) {
        return { codeByProp: {}, json: {} };
    }

    const argsExpression = unwrapExpression(argsInitializer);
    if (!Node.isObjectLiteralExpression(argsExpression)) {
        return { codeByProp: {}, json: {} };
    }

    return objectLiteralToArgsData({
        objectLiteral: argsExpression,
        sourceFile,
    });
};

/**
 * Extracts normalized story metadata from a story file.
 */
const getStoryMeta = ({ sourceFile }: StoryMetaOptions): StoryMeta | null => {
    const metaObjectLiteral = getDefaultExportObjectLiteral(sourceFile);
    if (!metaObjectLiteral) {
        return null;
    }

    const title = getStringPropertyValue(metaObjectLiteral, 'title', sourceFile);
    if (!title) {
        return null;
    }

    const titleParts = title.split('/').filter(Boolean);
    const componentName = titleParts[titleParts.length - 1];
    if (!componentName) {
        return null;
    }

    return {
        componentName,
        description: getNestedDescription(metaObjectLiteral, sourceFile),
        metaArgs: getMetaArgs(metaObjectLiteral, sourceFile),
        title,
    };
};

/**
 * Merges meta args with story-specific overrides.
 */
const mergeArgs = ({ baseArgs, overrideArgs }: MergeArgsOptions): ObjectLiteralArgsData => ({
    codeByProp: {
        ...baseArgs.codeByProp,
        ...overrideArgs?.codeByProp,
    },
    json: {
        ...baseArgs.json,
        ...overrideArgs?.json,
    },
});

/**
 * Returns the object literal assigned to StoryName.args.
 */
const getStoryArgsObjectLiteral = (
    sourceFile: SourceFile,
    storyName: string,
): ObjectLiteralExpression | undefined => {
    const matchingBinaryExpression = sourceFile
        .getDescendantsOfKind(SyntaxKind.BinaryExpression)
        .find((binaryExpression) => {
            if (binaryExpression.getOperatorToken().getText() !== '=') {
                return false;
            }

            const leftExpression = binaryExpression.getLeft();
            return (
                Node.isPropertyAccessExpression(leftExpression) &&
                leftExpression.getExpression().getText() === storyName &&
                leftExpression.getName() === 'args'
            );
        });

    if (!matchingBinaryExpression) {
        return undefined;
    }

    const rightExpression = unwrapExpression(matchingBinaryExpression.getRight() as Expression);

    return Node.isObjectLiteralExpression(rightExpression) ? rightExpression : undefined;
};

/**
 * Returns merged args for a specific story.
 */
const getStoryArgs = ({
    metaArgs,
    sourceFile,
    storyName,
}: StoryArgsOptions): ObjectLiteralArgsData => {
    const storyArgsObjectLiteral = getStoryArgsObjectLiteral(sourceFile, storyName);

    if (!storyArgsObjectLiteral) {
        return metaArgs;
    }

    return mergeArgs({
        baseArgs: metaArgs,
        overrideArgs: objectLiteralToArgsData({
            objectLiteral: storyArgsObjectLiteral,
            sourceFile,
        }),
    });
};

/**
 * Returns exported story names for a story source file.
 */
const getExportedStoryNames = (sourceFile: SourceFile): string[] =>
    sourceFile
        .getVariableStatements()
        .filter((variableStatement) => variableStatement.isExported())
        .flatMap((variableStatement) =>
            variableStatement.getDeclarations().map((declaration) => declaration.getName()),
        );

/**
 * Formats a package name into a readable display name.
 */
const formatPackageDisplayName = (packageName: string): string =>
    packageName
        .split('-')
        .filter(Boolean)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join(' ');

/**
 * Returns the configured package display name.
 */
const getPackageDisplayName = ({ filters, packageName }: PackageDisplayNameOptions): string =>
    filters.find((filter) => filter.id === packageName)?.name ??
    formatPackageDisplayName(packageName);

/**
 * Returns docs.json component docs for a package component.
 */
const getComponentDocs = ({ componentName, jsonDocs, packageName }: ComponentDocsOptions) =>
    jsonDocs?.packages?.[packageName]?.find(
        (componentDocs) => componentDocs.name === componentName,
    ) ?? null;

/**
 * Returns the absolute package directory path.
 */
const getPackageDirectoryPath = (packageName: string): string =>
    path.resolve(config.rootDir, packageName);

/**
 * Returns package.json data for a package when available.
 */
const getPackageJson = (packageName: string): PackageJsonData | null => {
    const packageJsonPath = path.resolve(getPackageDirectoryPath(packageName), 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJsonData;
    } catch (error) {
        script.error(`Invalid package.json in ${packageJsonPath}.`, error);
        throw error;
    }
};

/**
 * Returns the npm package name for a package.
 */
const getNpmPackageName = (packageName: string): string =>
    getPackageJson(packageName)?.name ?? `${DEFAULT_PACKAGE_PREFIX}/${packageName}`;

/**
 * Formats a component list for Markdown text.
 */
const formatComponentList = (componentNames: string[]): string =>
    componentNames.map((componentName) => `\`${componentName}\``).join(', ');

/**
 * Builds a package summary description.
 */
const getPackageDescription = (packageDocs: PackageStoryDocs): string => {
    const componentNames = Object.keys(packageDocs.components).sort((left, right) =>
        left.localeCompare(right),
    );

    if (componentNames.length === 0) {
        return `${packageDocs.npmPackageName} is a React package in the chayns-components monorepo with no documented Storybook components yet.`;
    }

    if (componentNames.length === 1) {
        return `React component package providing ${formatComponentList(componentNames)} for chayns applications.`;
    }

    return `React component package providing ${componentNames.length} documented components for chayns applications.`;
};

/**
 * Builds a package contents description.
 */
const getPackageContentsDescription = (packageDocs: PackageStoryDocs): string => {
    const componentNames = Object.keys(packageDocs.components).sort((left, right) =>
        left.localeCompare(right),
    );

    if (componentNames.length === 0) {
        return 'No Storybook examples were found for this package, so no component usage patterns are available yet.';
    }

    return `Documented components: ${formatComponentList(componentNames)}.`;
};

/**
 * Creates an empty package docs object.
 */
const createPackageStoryDocs = (packageName: string): PackageStoryDocs => ({
    components: {},
    contentsDescription: '',
    displayName: getPackageDisplayName({
        filters: config.filters,
        packageName,
    }),
    npmPackageName: getNpmPackageName(packageName),
    packageDescription: '',
    packageName,
});

/**
 * Finalizes derived package descriptions.
 */
const finalizePackageStoryDocs = (packageDocs: PackageStoryDocs): PackageStoryDocs => ({
    ...packageDocs,
    contentsDescription: getPackageContentsDescription(packageDocs),
    packageDescription: getPackageDescription(packageDocs),
});

/**
 * Writes the package AI usage markdown file.
 */
const writePackageAIUsageFile = (packageDocs: PackageStoryDocs): string => {
    const outputFilePath = path.resolve(
        getPackageDirectoryPath(packageDocs.packageName),
        'AI_USAGE.md',
    );
    const markdown = renderPackageAIUsage({ packageDocs });

    fs.writeFileSync(outputFilePath, markdown, 'utf8');

    return outputFilePath;
};

/**
 * Creates a dedicated ts-morph project for story parsing.
 */
const createProject = (): Project =>
    new Project({
        skipAddingFilesFromTsConfig: true,
        tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
    });

/**
 * Collects story docs from the configured Storybook stories.
 */
const getStoryDocs = (jsonDocs: JsonDocsFile | null): GenerateAIDocsResult => {
    const project = createProject();
    const storyFilePaths = getStoryFilePaths({
        packageNames: config.packages,
        rootDir: config.rootDir,
    });

    project.addSourceFilesAtPaths(storyFilePaths);

    const packages = config.packages.reduce<Record<string, PackageStoryDocs>>(
        (result, packageName) => {
            result[packageName] = createPackageStoryDocs(packageName);

            return result;
        },
        {},
    );

    project.getSourceFiles().forEach((sourceFile) => {
        const relativeSourceFilePath = getRelativePosixPath({
            rootPath: process.cwd(),
            targetPath: sourceFile.getFilePath(),
        });
        const packageName = relativeSourceFilePath.split('/')[1];

        if (!packageName) {
            return;
        }

        const storyMeta = getStoryMeta({ sourceFile });
        if (!storyMeta) {
            return;
        }

        const packageDocs = packages[packageName] ?? createPackageStoryDocs(packageName);
        packages[packageName] = packageDocs;

        const componentDocs =
            packageDocs.components[storyMeta.componentName] ??
            ({
                componentName: storyMeta.componentName,
                description: storyMeta.description,
                docs: getComponentDocs({
                    componentName: storyMeta.componentName,
                    jsonDocs,
                    packageName,
                }),
                examples: [],
                importPath: `@chayns-components/${packageName}`,
                title: storyMeta.title,
            } satisfies ComponentStoryDocs);

        packageDocs.components[storyMeta.componentName] = componentDocs;

        getExportedStoryNames(sourceFile).forEach((storyName) => {
            const storyArgs = getStoryArgs({
                metaArgs: storyMeta.metaArgs,
                sourceFile,
                storyName,
            });

            componentDocs.examples.push({
                args: storyArgs.json,
                argsSource: storyArgs.codeByProp,
                code: buildUsageCode({
                    argsCodeByProp: storyArgs.codeByProp,
                    componentName: storyMeta.componentName,
                    packageName,
                    storyName,
                }),
                importCode: buildUsageImportCode({
                    argsCodeByProp: storyArgs.codeByProp,
                    componentName: storyMeta.componentName,
                    packageName,
                }),
                jsx: buildUsageJsx({
                    argsCodeByProp: storyArgs.codeByProp,
                    componentName: storyMeta.componentName,
                }),
                sourceFilePath: relativeSourceFilePath,
                storyName,
                storyTitle: `${storyMeta.title}/${storyName}`,
            });
        });
    });

    const finalizedPackages = Object.fromEntries(
        Object.entries(packages).map(([packageName, packageDocs]) => [
            packageName,
            finalizePackageStoryDocs(packageDocs),
        ]),
    ) as Record<string, PackageStoryDocs>;

    return {
        generatedAt: new Date().toISOString(),
        packages: finalizedPackages,
    };
};

/**
 * Builds AI usage Markdown files for all configured packages.
 */
export const buildAiUsage = async () => {
    script.step('Generating AI usage files...');

    const jsonDocs = getJsonDocs();
    const docs = getStoryDocs(jsonDocs);
    let writtenFiles = 0;

    Object.values(docs.packages).forEach((packageDocs) => {
        const outputFilePath = writePackageAIUsageFile(packageDocs);
        writtenFiles += 1;
        script.info(
            `Wrote ${getRelativePosixPath({ rootPath: process.cwd(), targetPath: outputFilePath })}.`,
        );
    });

    script.success(`Generated ${writtenFiles} AI usage files.`);

    return docs;
};
