/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/', 'index.tsx'),
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /\.\/native/, contextRegExp: /\/pg\// }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, 'public', 'index_template.ejs'),
                filename: './index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css',
        }),
        //      new ReactRefreshWebpackPlugin(),
    ],
    context: path.resolve(__dirname, 'app'),
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // plugins: [
                        //     '@babel/plugin-syntax-dynamic-import',
                        //     '@babel/plugin-transform-runtime',
                        //     'lodash',
                        //     [
                        //         'babel-plugin-import',
                        //         {
                        //             'libraryName': '@material-ui/core',
                        //             'camel2DashComponentName': false,
                        //         },
                        //         'core',
                        //     ],
                        //     [
                        //         'babel-plugin-import',
                        //         {
                        //             'libraryName': '@material-ui/icons',
                        //             'camel2DashComponentName': false,
                        //         },
                        //         'icons',
                        //     ],
                        //     'react-refresh/babel',
                        // ],
                        // presets: [
                        //     '@babel/preset-env',
                        //     '@babel/preset-react',
                        //     '@babel/preset-typescript',
                        // ],
                    },
                },
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'],
        modules: [
            'node_modules',
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, '.'),
        ],
        plugins: [new TsconfigPathsPlugin({/* options: see https://www.npmjs.com/package/tsconfig-paths-webpack-plugin */})]
    },

    // DEV
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        allowedHosts: 'all',
        port: 4000,
        host: '0.0.0.0',
        static: {
            directory: path.resolve(__dirname, './build'),
        },
        watchFiles: [path.resolve(__dirname, './build')],
        hot: true,
        compress: true,
        historyApiFallback: true,
        // proxy: {
        //     '/api/**': {
        //         target: 'http://django:8000',
        //         changeOrigin: true,
        //         secure: false,
        //     },
        // },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
    },
};
