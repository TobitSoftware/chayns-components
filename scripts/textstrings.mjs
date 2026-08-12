import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const command = process.argv[2];

if (command !== 'push' && command !== 'pull') {
    console.error('Usage: node scripts/textstrings.mjs <push|pull>');
    process.exit(1);
}

const root = resolve(import.meta.dirname, '..');
const packagesPath = join(root, 'packages');
const packageDirectories = readdirSync(packagesPath, { withFileTypes: true })
    .filter(
        (entry) =>
            entry.isDirectory() && existsSync(join(packagesPath, entry.name, 'textstrings.config.ts')),
    )
    .map((entry) => entry.name)
    .sort();

for (const packageName of packageDirectories) {
    const packagePath = join(packagesPath, packageName);
    const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

    console.log(`\n[textstrings:${command}] ${packageName}`);

    const result = spawnSync(npxCommand, ['txt', command], {
        cwd: packagePath,
        stdio: 'inherit',
        // Windows batch files cannot be spawned directly by Node 24.
        shell: process.platform === 'win32',
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}
