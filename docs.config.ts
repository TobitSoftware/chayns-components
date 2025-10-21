import path from 'path';
import process from 'process';

/**
 * Describes a visual/category filter for the generated docs output.
 * This helps UIs group components (e.g., "Core", "ColorPicker") and display icons.
 */
export interface PackageFilter {
    name: string;
    id: string;
    icons: string[];
}

/**
 * Configuration contract for the docs/types generator.
 * This config is imported at runtime by the generator script via dynamic ESM import.
 *
 * AI note:
 * - This file is intentionally simple and side-effect free.
 * - Keep it JSON-serializable where possible; the script reads values only.
 * - "rootDir" should point to the monorepo packages directory.
 * - "packages" is the list of package folder names (relative to rootDir) to scan.
 * - "filters" is a UI helper, not used for type extraction itself.
 * - "exclude" can be used by UIs to hide certain exports if desired.
 */
export interface GenerateTypesConfig {
    /**
     * Absolute path to the monorepo packages root.
     * Example: <repo>/packages
     */
    rootDir: string;
    /**
     * Relative package directories to scan under rootDir.
     * Example entries: "core", "color-picker".
     */
    packages: string[];
    /**
     * Optional UI filters: map a package to display name + icons.
     * Not required by the extractor, but embedded into the JSON output for consumers.
     */
    filters: PackageFilter[];
    /**
     * Absolute path to the output JSON file that the generator writes.
     */
    outputFile: string;
    /**
     * Optional list of export names to exclude in the consumer UI.
     * The generator does not enforce this, but it is exposed in the JSON for downstream filtering.
     */
    exclude?: string[];
}

/**
 * Default configuration for the docs/types generator.
 * Adjust "packages" to the set of packages that should be included in the export.
 *
 * Execution:
 *   npx ts-node --esm scripts/generate-docs.ts
 *
 * Expectations:
 * - Each package should follow the convention: <rootDir>/<pkg>/src/index.ts
 * - Default component re-exports in index.ts follow the pattern:
 *     export { default as ComponentName } from './ComponentName';
 */
const config: GenerateTypesConfig = {
    rootDir: path.resolve(process.cwd(), 'packages'),
    packages: [
        'code-highlighter',
        'color-picker',
        'core',
        'date',
        'devalue-slider',
        'emoji-input',
        'format',
        'gallery',
        'maps',
        'person-finder',
        'ranking',
        'scanner',
        'swipeable-wrapper',
        'textstring',
        'translation',
        'typewriter',
    ],
    filters: [
        { id: 'core', name: 'Core', icons: ['fa fa-brain'] },
        {
            id: 'code-highlighter',
            name: 'CodeHighlighter',
            icons: ['fa fa-code'],
        },
        {
            id: 'color-picker',
            name: 'ColorPicker',
            icons: ['fa fa-eye-dropper'],
        },
        {
            id: 'date',
            name: 'Date',
            icons: ['fa fa-calendar'],
        },
        {
            id: 'devalue-slider',
            name: 'DevalueSlider',
            icons: ['fa fa-slider'],
        },
        {
            id: 'emoji-input',
            name: 'EmojiInput',
            icons: ['fa fa-icons'],
        },
        {
            id: 'gallery',
            name: 'Gallery',
            icons: ['fa fa-images'],
        },
        {
            id: 'maps',
            name: 'Maps',
            icons: ['fa fa-location-dot'],
        },
        {
            id: 'person-finder',
            name: 'PersonFinder',
            icons: ['fa fa-user-magnifying-glass'],
        },
        {
            id: 'ranking',
            name: 'Ranking',
            icons: ['fa fa-ranking-star'],
        },
        {
            id: 'scanner',
            name: 'Scanner',
            icons: ['fa fa-scanner-touchscreen'],
        },
        {
            id: 'swipeable-wrapper',
            name: 'SwipeableWrapper',
            icons: ['fa fa-slider'],
        },
        {
            id: 'textstring',
            name: 'Textstring',
            icons: ['fa fa-paragraph'],
        },
        {
            id: 'translation',
            name: 'Translation',
            icons: ['fa fa-language'],
        },
        {
            id: 'typewriter',
            name: 'Typewriter',
            icons: ['fa fa-typewriter'],
        },
    ],
    outputFile: path.resolve(process.cwd(), 'dist/types.json'),
    // exclude: ['default'], // Example: allow consumers to hide certain export names
};

export default config;
