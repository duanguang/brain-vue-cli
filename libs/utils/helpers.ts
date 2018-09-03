import WebpackDllManifest from '../settings/WebpackDllManifest';
const {DllReferencePlugin} = require('webpack');
import * as path from 'path';
export function getDllReferencePlugin() {
    try {
        const webpackDllManifest = WebpackDllManifest.getInstance();
        const vendorsHash = webpackDllManifest.getVendorsHash();
        const distPath = webpackDllManifest.distPath;
        const manifest = require(path.join(distPath, 'vendor.dll' + `.json`));
        return new DllReferencePlugin({
            context: process.cwd(),
            manifest
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}