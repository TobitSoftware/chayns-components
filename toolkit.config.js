/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack(config) {
        config.entry = path.resolve('./examples/index.jsx');

        config.plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve('./examples/index.html'),
            })
        );

        return config;
    },
};
