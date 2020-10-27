module.exports = (api) => {
    api.cache(true);

    return { presets: ['./babelPreset.js'] };
};
