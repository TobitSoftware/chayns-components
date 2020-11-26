/**
 *  @typedef {import('rollup').RollupOptions} RollupConfig
 */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

/** @type RollupConfig */
const commonOptions = {
    input: 'src/index.js',
    output: {
        format: 'umd',
        name: 'ChaynsComponents',
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        sourcemap: true,
    },
    external: ['react', 'react-dom'],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        commonjs(),
    ],
};

/** @type RollupConfig */
const devOptions = {
    ...commonOptions,
    output: {
        ...commonOptions.output,
        file: 'dist/umd/chayns-components.development.js',
    },
    plugins: [
        ...commonOptions.plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        postcss({ plugins: [postcssPresetEnv()] }),
    ],
};

/** @type RollupConfig */
const prodOptions = {
    ...commonOptions,
    output: {
        ...commonOptions.output,
        file: 'dist/umd/chayns-components.production.js',
    },
    plugins: [
        ...commonOptions.plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        postcss({ plugins: [postcssPresetEnv(), cssnano()] }),
        terser(),
    ],
};

export default [devOptions, prodOptions];
