import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

export default {
    input: 'src/index.js',
    output: [
        { file: pkg.module, format: 'esm', sourcemap: true },
        { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
        external(),
        autoExternal(),
        babel({
            exclude: 'node_modules/**',
            // if external helpers true then use global babel object
            externalHelpers: true,
            runtimeHelpers: true,
        }),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        commonjs(),
        postcss({
            plugins: [],
        }),
    ],
};
