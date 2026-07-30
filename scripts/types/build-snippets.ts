/**
 * Maps package names to the public exports that need to be imported for a snippet.
 */
export type BuildSnippetsImports = Record<string, string[]>;

/**
 * Describes a single insertable component snippet in the generated snippets output.
 */
export interface BuildSnippetsComponent {
    code: string;
    imports: BuildSnippetsImports;
    name: string;
}

/**
 * Describes the full JSON payload written by the snippets generator.
 */
export interface BuildSnippetsOutput {
    packages: Record<string, BuildSnippetsComponent[]>;
}
