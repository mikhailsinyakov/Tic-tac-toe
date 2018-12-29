const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

require('dotenv').config();

const app = express();
const configPath = `./webpack.${process.env.MODE == 'development' ? 'dev' : 'prod'}.js`;
const config = require(configPath);
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port} ...`);
});