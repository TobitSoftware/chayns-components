module.exports = (api, options) => {
    const { cjs = false, renameSCSS = false, removeCSS = false } = options;

    return {
        presets: [
            ['@babel/env', { modules: cjs ? 'cjs' : false }],
            '@babel/react',
        ],
        plugins: [
            '@babel/transform-runtime',
            'optimize-clsx',
            'dev-expression',
            '@babel/proposal-class-properties',
            removeCSS && [
                'transform-remove-imports',
                { test: '\\.(scss|css)$' },
            ],
            renameSCSS && [
                'transform-rename-import',
                {
                    original: '^(.+)\\.scss$',
                    replacement: '$1.css',
                },
            ],
        ].filter(Boolean),
    };
};
