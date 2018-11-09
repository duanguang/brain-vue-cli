"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const EConfig_1 = require("../../settings/EConfig");
const { apps, htmlWebpackPlugin: { title }, chunkhash } = EConfig_1.default.getInstance();
const path = require("path");
const getEntries_1 = require("../entries/getEntries");
var merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function htmlWebpackPluginInstance(templatePath, filename, chunks) {
    let conf = {
        template: templatePath,
        filename: `${filename}`,
        //filename:'index.html',
        alwaysWriteToDisk: true,
        chunks: chunks,
        title: title || 'webApp',
        inject: true
    };
    if (process.env.NODE_ENV === 'production') {
        conf = merge(conf, {
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency',
            filename: filename,
            hash: !chunkhash,
        });
    }
    return new HtmlWebpackPlugin(conf);
}
function getHtmlWebpackPlugins() {
    return (getEntries_1.entries()).map((app) => {
        const workingDirectory = process.cwd();
        const relativeTargetDirectory = `${app}`;
        const relativeTargetHtml = path.join(relativeTargetDirectory, '/index.html');
        const projectTargetPath = path.resolve(workingDirectory, 'src', relativeTargetHtml);
        let chunks = process.env.NODE_ENV === 'production' ? [app, 'manifest', 'vendor'] : [app];
        if (fs.existsSync(projectTargetPath)) {
            return htmlWebpackPluginInstance(projectTargetPath, relativeTargetHtml, chunks);
        }
        else {
            const baseTarget = path.resolve(__dirname, '../../../tpl/index.ejs');
            return htmlWebpackPluginInstance(baseTarget, relativeTargetHtml, chunks);
        }
    });
}
exports.getHtmlWebpackPlugins = getHtmlWebpackPlugins;
