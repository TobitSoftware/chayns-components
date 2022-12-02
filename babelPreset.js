module.exports = (api, options) => {
    const { cjs = false, cssImports } = options;

    return {
        presets: [
            ['@babel/env', { modules: cjs ? 'cjs' : false, loose: true }],
            '@babel/react',
        ],
        plugins: [
            '@babel/transform-runtime',
            'optimize-clsx',
            'dev-expression',
            ['@babel/proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            cssImports === 'remove' && [
                'transform-remove-imports',
                { test: '\\.(scss|css)$' },
            ],
            cssImports === 'rename' && [
                'transform-rename-import',
                {
                    original: '^(.+)\\.scss$',
                    replacement: '$1.css',
                },
            ],
        ].filter(Boolean),
    };
};
