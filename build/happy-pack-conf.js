"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EConfig_1 = require("../libs/settings/EConfig");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var vueLoaderConfig = require('./vue-loader.conf');
const { projectType, webpack: { happypack } } = EConfig_1.default.getInstance();
let pluginsOptions = vueLoaderConfig;
if (projectType === 'js') {
    pluginsOptions = vueLoaderConfig;
}
else if (projectType === 'ts') {
    pluginsOptions = Object.assign(vueLoaderConfig, {
        loaders: {
            //   ts: 'ts-loader',
            ts: 'babel-loader!ts-loader'
        }
    });
}
exports.plugins = happypack ? [
    new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [{
                path: 'babel-loader',
                query: { cacheDirectory: true }
            }]
    }),
    new HappyPack({
        id: 'vuejs',
        threadPool: happyThreadPool,
        loaders: [{
                loader: 'vue-loader',
                options: pluginsOptions
            }]
    })
] : [];
