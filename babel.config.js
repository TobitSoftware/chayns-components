module.exports = (api) => {
    api.cache(true);

    return {
        presets: [['@babel/env', { modules: false }], '@babel/react'],
        plugins: [
            '@babel/transform-runtime',
            'optimize-clsx',
            'dev-expression',
            '@babel/proposal-class-properties',
        ],
    };
};
