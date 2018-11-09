"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
const EConfig_1 = require("../libs/settings/EConfig");
const getEntries_1 = require("../libs/webpack/entries/getEntries");
const { apps, babel: { include }, imageInLineSize, disableEslint, webpack: { happypack } } = EConfig_1.default.getInstance();
function resolve(dir) {
    return path.join(process.cwd(), './', dir);
    //return path.join(__dirname, '..', dir)
}
let rulesEslint = [];
if (!disableEslint) {
    rulesEslint.push({
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    });
}
let rule = [];
if (happypack) {
    rule = [{
            test: /\.js$/,
            loader: 'happypack/loader?id=js',
            include: [resolve('src'), resolve('test'), ...include.map((item) => resolve(item))]
        },
        {
            test: /\.vue$/,
            loader: 'happypack/loader?id=vuejs',
        }];
}
else {
    rule = [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), ...include.map((item) => resolve(item))]
        },
    ];
}
module.exports = {
    // entry: {
    //   app: './src/app1/main.js'
    // },
    entry: getEntries_1.getEntries(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [resolve('src'), resolve('test')],
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            ...rule,
            // {
            //   test: /\.vue$/,
            //   loader: 'vue-loader',
            //   options: vueLoaderConfig
            // },
            // {
            //   test: /\.js$/,
            //   loader: 'babel-loader',
            //   include: [resolve('src'), resolve('test'),...include.map((item)=>resolve(item))]
            // },
            { test: /iview.src.*?js$/, loader: 'babel-loader' },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: imageInLineSize,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: imageInLineSize,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: imageInLineSize,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ].concat(rulesEslint)
    }
};
