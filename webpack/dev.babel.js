import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';

const ROOT_PATH = path.resolve('.');

let sslCert;
let sslKey;
try {
    sslCert = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.crt'));
    sslKey = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.key'));
} catch (err) {
    sslCert = null;
    sslKey = null;
}

export default (env) => {
    const production = !!(env && env.prod);

    return {
        entry: {
            template: [
                '@babel/polyfill',
                path.resolve(ROOT_PATH, 'examples', 'index')
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        },
        output: {
            path: path.resolve(ROOT_PATH, 'build'),
            filename: '[name].bundle.js'
        },
        mode: (production ? 'production' : 'development'),
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            port: 9009,
            historyApiFallback: true,
            compress: true,
            hot: true,
            https: !!(sslCert && sslKey),
            cert: sslCert,
            key: sslKey,
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
                                sourceMap: true
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
                template: path.resolve(ROOT_PATH, 'examples', 'index.html'),
                templateParameters: {
                    chaynsCssUrl: (process.env.CHAYNS_CSS_URL || 'https://api.chayns.net/css/'),
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify((production || process.env.NODE_ENV === 'production') ? 'production' : 'development'),
                __DEV__: !production,
                __QA__: false,
                __LIVE__: production,
            })
        ]
    };
};
