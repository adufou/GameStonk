import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        allowedHosts: ['all', 'ns399800.ip-5-196-67.eu'],
        port: 4000,
        host: '0.0.0.0',
        // publicPath: '/',
        hot: true,
        // inline: true,
        compress: true,
        // contentBase: path.resolve(__dirname, './build'),
        historyApiFallback: true,
        // watchContentBase: true,
        proxy: {
            '/api/**': {
                target: 'http://django:8000',
                changeOrigin: true,
                secure: false,
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
    // watchOptions: {
    //   poll: true,
    // },
    },
//   watch: true,
//   watchOptions: {
//     poll: true,
//     ignored: /node_modules/,
//   },
});
