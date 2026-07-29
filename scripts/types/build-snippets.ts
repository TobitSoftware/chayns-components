/**
 * Describes a single insertable component snippet in the generated snippets output.
 */
export interface BuildSnippetsComponent {
    code: string;
    name: string;
}

/**
 * Describes the full JSON payload written by the snippets generator.
 */
export interface BuildSnippetsOutput {
    packages: Record<string, BuildSnippetsComponent[]>;
}
