import fs from 'fs';
import path from 'path';
import process from 'process';
import type { BuildDocsComponent } from '../types/build-docs';
import type { BuildSnippetsComponent, BuildSnippetsOutput } from '../types/build-snippets';
import { buildDocs } from './build-docs';
import { script } from './logger';

const OUTPUT_FILE_PATH = path.resolve(process.cwd(), 'dist/snippets.json');
const PACKAGES_ROOT_PATH = path.resolve(process.cwd(), 'packages');

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

    return fs.readFileSync(snippetFilePath, 'utf8').trim();
};

/**
 * Converts documented components into snippet components by attaching raw snippet code.
 */
const buildPackageSnippets = (
    packageName: string,
    components: BuildDocsComponent[],
): BuildSnippetsComponent[] =>
    components
        .map((component) => {
            const code = getComponentSnippetCode(packageName, component.name);

            if (!code) {
                return null;
            }

            return {
                code,
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
    const output: BuildSnippetsOutput = {
        packages: {},
    };

    Object.entries(docsOutput.packages).forEach(([packageName, components]) => {
        const snippetComponents = buildPackageSnippets(packageName, components);

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
