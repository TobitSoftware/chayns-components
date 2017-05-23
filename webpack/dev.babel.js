import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve('.');

export default {
    entry: {
        template: [
            path.resolve(ROOT_PATH, 'examples', 'index')
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: `[name].bundle.js`
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9000,
        historyApiFallback: true,
        compress: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: path.resolve(ROOT_PATH, 'node_modules')
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'examples', 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true,
            __QA__: false,
            __LIVE__: false,
        })
    ]
};