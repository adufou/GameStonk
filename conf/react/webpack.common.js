const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /\.\/native/, contextRegExp: /\/pg\// }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, 'public', 'index_template.ejs'),
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
    // require('tailwindcss'),
    // require('./tailwind.config.js'),
  ],
  context: path.join(__dirname),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       {
    //         loader: 'style-loader',
    //         options: {
    //           sourceMap: true,
    //         },
    //       },
    //       {
    //         loader: 'css-loader',
    //         options: {
    //           sourceMap: true,
    //         },
    //       },
    //       {
    //         loader: 'sass-loader',
    //         options: {
    //           data: '/static/css/style.css',
    //           sourceMap: true,
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.sass$/,
    //     use: [
    //       'css-loader',
    //       {
    //         loader: 'sass-loader',
    //         options: {
    //           indentedSyntax: true,
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.css$/i,
    //     include: path.resolve(__dirname, 'src'),
    //     exclude: /node_modules/,
    //     use: [
    //       'style-loader',
    //       {
    //         loader: MiniCssExtractPlugin.loader,
    //         // options: {
    //         //   hmr: argv.mode === 'development'
    //         // }
    //       },
    //       {
    //         loader: 'css-loader',
    //         options: {
    //           importLoaders: 1
    //         }
    //       },
    //       'postcss-loader',
    //       {
    //         loader: 'postcss-loader'
    //       }
    //     ]
    //   },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader", "postcss-loader",
      //   ],
      // },

      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: { importLoaders: 1 },
      //     },
      //     'postcss-loader',
      //   ],
      // },
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
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', 'sass'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, '.'),
    ],
  },
};
