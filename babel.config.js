module.exports = (api) => {
    const isProduction = api.env('production');

    return {
        presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            isProduction && 'optimize-clsx',
        ].filter(Boolean),
    };
};
