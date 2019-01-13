const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    entry: [
        __dirname + '/src/index.js',
        'webpack-hot-middleware/client'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'index.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@components': __dirname + '/src/components',
            '@utils': __dirname + '/src/utils',
            '@app': __dirname + '/app',
            '@lib': __dirname + '/src/lib'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Крестики-нолики',
            favicon: __dirname + '/src/favicon.ico',
            meta: {
                description: 'Tic-tac-toe game',
                author: 'Mikhail Sinyakov'
            }
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [{
                module: 'font-awesome',
                entry: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'
            }]
        }),
        new CleanWebpackPlugin()
    ]
};