const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = config;