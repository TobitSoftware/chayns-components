import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import autoExternal from 'rollup-plugin-auto-external';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

export default {
    input: 'src/index.js',
    output: {
        file: {
            es: pkg.module,
            cjs: pkg.main
        }[env],
        format: env
    },
    external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
    plugins: [
        external(),
        autoExternal(),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        babel({
            exclude: 'node_modules/**',
            // if external helpers true then use global babel object
            externalHelpers: true,
            runtimeHelpers: true
        }),
        commonjs()
    ]
};
