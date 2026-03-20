export default {
    plugins: [['babel-plugin-react-compiler', { target: '18' }]],
    env: {
        esm: {
            sourceType: 'unambiguous',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: [],
        },
        cjs: {
            sourceType: 'unambiguous',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: { node: 16 },
                        modules: 'commonjs',
                    },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: [],
        },
    },
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
};
