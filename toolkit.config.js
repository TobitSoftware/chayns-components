/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    development: {
        host: '0.0.0.0',
        port: 9009,
        cert: 'ssl/ssl.crt',
        key: 'ssl/ssl.key',
    },
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
