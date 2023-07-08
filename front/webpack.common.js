import { resolve as _resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

const entry = [
    _resolve(__dirname, 'src', 'index.tsx'),
];

const output = {
    path: _resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
};

const plugins = [
    new webpack.IgnorePlugin({ resourceRegExp: /\.\/native/, contextRegExp: /\/pg\// }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
        {
            template: _resolve(__dirname, 'public', 'index_template.ejs'),
            filename: './index.html'
        }
    ),
    // new MiniCssExtractPlugin({
    //   filename: "index.css",
    //   chunkFilename: "index.css"
    // }),
    new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css'
    }),
];

const context = join(__dirname);

const module = {
    rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-transform-runtime',
                        'lodash',
                        [
                            'babel-plugin-import',
                            {
                                'libraryName': '@material-ui/core',
                                'camel2DashComponentName': false,
                            },
                            'core',
                        ],
                        [
                            'babel-plugin-import',
                            {
                                'libraryName': '@material-ui/icons',
                                'camel2DashComponentName': false,
                            },
                            'icons',
                        ],
                    ],
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
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
    ],
};

const resolve = {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'],
    modules: [
        'node_modules',
        _resolve(__dirname, './src'),
        _resolve(__dirname, '.'),
    ],
};

export default {
    entry,
    output,
    plugins,
    context,
    module,
    resolve,
};
