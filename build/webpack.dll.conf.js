"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackDllManifest_1 = require("../libs/settings/WebpackDllManifest");
const EConfig_1 = require("../libs/settings/EConfig");
var path = require('path');
var webpack = require('webpack');
const { webpack: { dllConfig: { vendors } } } = EConfig_1.default.getInstance();
const webpackDllManifest = WebpackDllManifest_1.default.getInstance();
const distPath = webpackDllManifest.distPath;
const isVendorExist = vendors && vendors.length;
if (isVendorExist) {
    const distFileName = webpackDllManifest.getVendorsHash();
    module.exports = {
        entry: {
            vendors
        },
        output: {
            path: distPath,
            //filename: `${distFileName}.js`, //打包文件的名字
            filename: `vendor.dll.js`,
            library: '[name]_library' //可选 暴露出的全局变量名
            // vendor.dll.js中暴露出的全局变量名。
            // 主要是给DllPlugin中的name使用，
            // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
        },
        plugins: [
            new webpack.DllPlugin({
                //path: path.join(distPath, `${distFileName}.json`),
                path: path.join(distPath, `vendor.dll.json`),
                name: '[name]_library'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true
                },
                output: {
                    // 去掉注释内容
                    comments: false,
                },
                sourceMap: false
            })
        ]
    };
}
