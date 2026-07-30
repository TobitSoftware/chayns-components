import process from 'process';
import { buildSnippets } from './utils/build-snippets';
import { script } from './utils/logger';
import { uploadSnippets } from './utils/upload-docs';

/**
 * Runs the snippets generation script.
 */
const main = async (): Promise<void> => {
    await buildSnippets();

    await uploadSnippets();
};

void main().catch((error) => {
    script.error('Failed to generate snippets.', error);
    process.exit(1);
});
