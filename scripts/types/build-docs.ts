import type { PackageFilter } from '../../docs.config';

/**
 * Extends the docs package filter with the optional package version.
 */
export interface BuildDocsFilter extends PackageFilter {
    version?: string;
}

/**
 * Describes a documented component prop in the generated docs output.
 */
export interface BuildDocsProp {
    description?: string;
    name: string;
    required: boolean;
    type: string;
}

/**
 * Describes an extracted supporting type in the generated docs output.
 */
export interface BuildDocsType {
    name: string;
    type: string;
}

/**
 * Describes a single documented component in the generated docs output.
 */
export interface BuildDocsComponent {
    code?: string;
    name: string;
    props: BuildDocsProp[];
    types: BuildDocsType[];
}

/**
 * Describes the full JSON payload written by the docs generator.
 */
export interface BuildDocsOutput {
    filter: BuildDocsFilter[];
    packages: Record<string, BuildDocsComponent[]>;
}
