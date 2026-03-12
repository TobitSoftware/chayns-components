import process from 'process';
import { buildDocs } from './utils/build-docs';
import { script } from './utils/logger';
import { uploadDocs } from './utils/upload-docs';

/**
 * Runs the docs generation script.
 */
const main = async (): Promise<void> => {
    await buildDocs();

    await uploadDocs();
};

void main().catch((error) => {
    script.error('Failed to generate docs.', error);
    process.exit(1);
});
