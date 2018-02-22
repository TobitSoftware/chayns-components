import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import external from 'rollup-plugin-peer-deps-external';

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
    external: ['react', 'classnames', 'prop-types', 'ract-dom', 'react-transition-group', 'emojione'],
    plugins: [
        external(),
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        babel({
            exclude: 'node_modules/**',
            // if external helpers true then use global babel object
            externalHelpers: true
        }),
        commonjs(),
        filesize()
    ]
};
