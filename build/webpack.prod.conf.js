"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const htmlWebpackPlugin_1 = require("../libs/webpack/plugins/htmlWebpackPlugin");
var path = require('path');
const EConfig_1 = require("../libs/settings/EConfig");
const happy_pack_conf_1 = require("./happy-pack-conf");
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { chunkhash } = EConfig_1.default.getInstance();
var env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env;
function resolve(dir) {
    return path.join(process.cwd(), './', dir);
    //return path.join(__dirname, '..', dir)
}
var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: chunkhash ? utils.assetsPath('js/[name].[chunkhash].js') : utils.assetsPath('js/[name].js'),
        chunkFilename: chunkhash ? utils.assetsPath('js/[id].[chunkhash].js') : utils.assetsPath('js/[id].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: process.env.environment === 'production' ? false : true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: chunkhash ? utils.assetsPath('css/[name].[contenthash].css') : utils.assetsPath('css/[name].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: process.env.NODE_ENV === 'testing'
        //     ? 'index.html'
        //     : config.build.index,
        //   template: 'index.html',
        //   inject: true,
        //   minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeAttributeQuotes: true
        //     // more options:
        //     // https://github.com/kangax/html-minifier#options-quick-reference
        //   },
        //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //   chunksSortMode: 'dependency'
        // }),
        ...htmlWebpackPlugin_1.getHtmlWebpackPlugins(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(resolve('node_modules')) === 0);
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve('static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ].concat(happy_pack_conf_1.plugins)
});
if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'),
        threshold: 10240,
        minRatio: 0.8
    }));
}
if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
