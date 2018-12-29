const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Крестики-нолики',
            favicon: __dirname + '/src/favicon.ico',
            meta: {
                description: 'Tic-tac-toe game',
                author: 'Mikhail Sinyakov'
            }
        }),
        new CleanWebpackPlugin()
    ]
};