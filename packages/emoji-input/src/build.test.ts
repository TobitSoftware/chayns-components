import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

it('emits the public type entry at the declared package path without test declarations', () => {
    const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
    const { types } = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
        types: string;
    };
    const outputDirectory = mkdtempSync(join(tmpdir(), 'emoji-input-types-'));

    try {
        execFileSync(
            process.execPath,
            [
                createRequire(import.meta.url).resolve('typescript/bin/tsc'),
                '--project',
                join(packageRoot, 'tsconfig.json'),
                '--outDir',
                outputDirectory,
            ],
            { timeout: 25_000, stdio: 'pipe' },
        );

        // A fresh output directory prevents old declarations from hiding a changed emit layout.
        expect(existsSync(join(outputDirectory, relative('lib/types', types)))).toBe(true);
        expect(
            readdirSync(outputDirectory, { recursive: true }).filter((file) =>
                file.toString().endsWith('.test.d.ts'),
            ),
        ).toEqual([]);
    } finally {
        rmSync(outputDirectory, { recursive: true, force: true });
    }
}, 30_000);
