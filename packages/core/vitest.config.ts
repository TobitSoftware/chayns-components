import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        exclude: ['**/lib/**'],
        include: ['src/**/*.test.{ts,tsx}'],
        setupFiles: './vitest.setup.ts',
    },
});
