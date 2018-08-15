"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge = require("webpack-merge");
var prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
