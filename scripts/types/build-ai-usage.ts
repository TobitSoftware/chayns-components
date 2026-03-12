import type { PackageFilter } from '../../docs.config';
import type { Expression, ObjectLiteralExpression, PropertyName, SourceFile } from 'ts-morph';

/**
 * Describes a primitive JSON-compatible value.
 */
export type JsonPrimitive = boolean | null | number | string;

/**
 * Describes a JSON-compatible value used in generated AI usage payloads.
 */
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

/**
 * Describes a JSON-compatible object used in generated AI usage payloads.
 */
export interface JsonObject {
    [key: string]: JsonValue | undefined;
}

/**
 * Describes a JSON-compatible array used in generated AI usage payloads.
 */
export interface JsonArray extends Array<JsonValue> {}

/**
 * Describes serialized args together with their original code snippets.
 */
export interface ObjectLiteralArgsData {
    codeByProp: Record<string, string>;
    json: JsonObject;
}

/**
 * Describes the options for reading an AST expression.
 */
export interface ExpressionOptions {
    expression: Expression;
    sourceFile: SourceFile;
    visitedIdentifiers?: Set<string>;
}

/**
 * Describes the options for reading an object literal AST node.
 */
export interface ObjectLiteralArgsDataOptions {
    objectLiteral: ObjectLiteralExpression;
    sourceFile: SourceFile;
    visitedIdentifiers?: Set<string>;
}

/**
 * Describes the options for generating a full example code block.
 */
export interface BuildUsageCodeOptions {
    argsCodeByProp: Record<string, string>;
    componentName: string;
    packageName: string;
    storyName: string;
}

/**
 * Describes the options for generating a package import statement.
 */
export interface BuildUsageImportCodeOptions {
    argsCodeByProp: Record<string, string>;
    componentName: string;
    packageName: string;
}

/**
 * Describes the options for generating JSX for a story example.
 */
export interface BuildUsageJsxOptions {
    argsCodeByProp: Record<string, string>;
    componentName: string;
}

/**
 * Describes the options for building a relative POSIX path.
 */
export interface RelativePathOptions {
    rootPath: string;
    targetPath: string;
}

/**
 * Describes a documented prop from docs.json.
 */
export interface JsonDocsProp extends JsonObject {
    description?: string;
    name: string;
    required: boolean;
    type: string;
}

/**
 * Describes an additional documented type from docs.json.
 */
export interface JsonDocsType extends JsonObject {
    name: string;
    type: string;
}

/**
 * Describes a single documented component from docs.json.
 */
export interface JsonDocsComponent extends JsonObject {
    code?: string;
    description?: string;
    name: string;
    props?: JsonDocsProp[];
    types?: JsonDocsType[];
}

/**
 * Describes the generated docs.json file structure.
 */
export interface JsonDocsFile extends JsonObject {
    filter?: JsonValue;
    packages?: Record<string, JsonDocsComponent[]>;
}

/**
 * Describes a generated story example used in AI usage files.
 */
export interface StoryExample extends JsonObject {
    args: JsonObject;
    argsSource: Record<string, string>;
    code: string;
    importCode: string;
    jsx: string;
    sourceFilePath: string;
    storyName: string;
    storyTitle: string;
}

/**
 * Describes the collected documentation for a single component.
 */
export interface ComponentStoryDocs extends JsonObject {
    componentName: string;
    description: string | null;
    docs: JsonDocsComponent | null;
    examples: StoryExample[];
    importPath: string;
    title: string;
}

/**
 * Describes the collected documentation for a single package.
 */
export interface PackageStoryDocs extends JsonObject {
    components: Record<string, ComponentStoryDocs>;
    contentsDescription: string;
    displayName: string;
    npmPackageName: string;
    packageDescription: string;
    packageName: string;
}

/**
 * Describes the full AI usage generation result.
 */
export interface GenerateAIDocsResult extends JsonObject {
    generatedAt: string;
    packages: Record<string, PackageStoryDocs>;
}

/**
 * Describes the markdown rendering options for a package AI usage file.
 */
export interface RenderPackageAIUsageOptions {
    packageDocs: PackageStoryDocs;
}

/**
 * Describes the markdown rendering options for the import section.
 */
export interface RenderImportSectionOptions {
    packageDocs: PackageStoryDocs;
}

/**
 * Describes the metadata extracted from a story file.
 */
export interface StoryMeta {
    componentName: string;
    description: string | null;
    metaArgs: ObjectLiteralArgsData;
    title: string;
}

/**
 * Describes the options for collecting story file paths.
 */
export interface StoryFilePathsOptions {
    packageNames: string[];
    rootDir: string;
}

/**
 * Describes the options for parsing story metadata.
 */
export interface StoryMetaOptions {
    sourceFile: SourceFile;
}

/**
 * Describes the options for resolving story args.
 */
export interface StoryArgsOptions {
    metaArgs: ObjectLiteralArgsData;
    sourceFile: SourceFile;
    storyName: string;
}

/**
 * Describes the options for merging story args.
 */
export interface MergeArgsOptions {
    baseArgs: ObjectLiteralArgsData;
    overrideArgs?: ObjectLiteralArgsData;
}

/**
 * Describes the options for resolving the package display name.
 */
export interface PackageDisplayNameOptions {
    filters: PackageFilter[];
    packageName: string;
}

/**
 * Describes the options for locating component docs in docs.json.
 */
export interface ComponentDocsOptions {
    componentName: string;
    jsonDocs: JsonDocsFile | null;
    packageName: string;
}

/**
 * Describes a package.json subset required by the AI usage generator.
 */
export interface PackageJsonData extends JsonObject {
    description?: string;
    name?: string;
}

/**
 * Describes a property name reader helper.
 */
export interface PropertyNameOptions {
    propertyName: PropertyName;
}
