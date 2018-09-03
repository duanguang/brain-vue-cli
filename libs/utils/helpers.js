"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackDllManifest_1 = require("../settings/WebpackDllManifest");
const { DllReferencePlugin } = require('webpack');
const path = require("path");
function getDllReferencePlugin() {
    try {
        const webpackDllManifest = WebpackDllManifest_1.default.getInstance();
        const vendorsHash = webpackDllManifest.getVendorsHash();
        const distPath = webpackDllManifest.distPath;
        const manifest = require(path.join(distPath, 'vendor.dll' + `.json`));
        return new DllReferencePlugin({
            context: process.cwd(),
            manifest
        });
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.getDllReferencePlugin = getDllReferencePlugin;
