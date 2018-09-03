"use strict";
// require('./check-versions')()
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'production';
var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');
var utils = require('./utils');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackDllManifest_1 = require("../libs/settings/WebpackDllManifest");
const helpers_1 = require("../libs/utils/helpers");
var plugins = [
    () => {
        //TODO:暂时放在这里
        const filepath = WebpackDllManifest_1.default.getInstance().resolveManifestPath();
        if (filepath) {
            const dllReferencePlugin = helpers_1.getDllReferencePlugin();
            if (dllReferencePlugin) {
                webpackConfig.plugins.push(dllReferencePlugin);
            }
            webpackConfig.plugins.push(new AddAssetHtmlPlugin({
                includeSourcemap: false, filepath,
                outputPath: utils.assetsPath('js'),
                publicPath: path.posix.join(config.build.assetsPublicPath, 'static/js'),
            }));
        }
    }
];
plugins.forEach(pending => pending());
var spinner = ora('building for production...');
spinner.start();
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err)
        throw err;
    webpack(webpackConfig, function (err, stats) {
        spinner.stop();
        if (err)
            throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'));
    });
});
