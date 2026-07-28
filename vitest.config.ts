import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        exclude: ['**/lib/**', '**/node_modules/**'],
        include: [
            'packages/core/src/**/*.test.{ts,tsx}',
            'packages/code-highlighter/src/**/*.test.{ts,tsx}',
            'packages/format/src/**/*.test.{ts,tsx}',
        ],
        setupFiles: ['./vitest.setup.ts'],
    },
});
