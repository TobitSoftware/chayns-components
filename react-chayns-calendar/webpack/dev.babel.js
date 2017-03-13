const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const rootPath = path.dirname(__dirname);
const entryPath = path.join( rootPath, "examples", "index.jsx" );
const buildPath = path.join( rootPath, "examples", "build" );
const htmlTemplate = path.join( rootPath, "examples", "index.html" );

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://0.0.0.0:9000',
        entryPath
    ],
    devServer: {
        historyApiFallback: true,

        https: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: htmlTemplate,
            filename: 'index.html'
        })
    ],
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },{
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    }
};