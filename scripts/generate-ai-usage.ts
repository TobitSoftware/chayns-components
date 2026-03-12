import process from 'process';
import { script } from './utils/logger';
import { buildDocs } from './utils/build-docs';
import { buildAiUsage } from './utils/build-ai-usage';

/**
 * Runs the AI usage generation script.
 */
const main = async (): Promise<void> => {
    await buildDocs();

    await buildAiUsage();
};

void main().catch((error) => {
    script.error('Failed to generate AI usage.', error);
    process.exit(1);
});
