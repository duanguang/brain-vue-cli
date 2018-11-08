"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {configFileList, default as EConfig} from '../settings/EConfig';
// import * as path from 'path';
// import commander = require('commander');
// import ICommand = commander.ICommand;
const server_1 = require("../../server");
function programInit(env) {
    if (env === 'dev') {
        // program.config && (configFileList[0] = program.config);
        // program.ignoreConfig && (configFileList[1] = program.ignoreConfig);
        server_1.default();
    }
    else if (env === 'prod' || env === 'dist' || env === 'test') {
        require('../../build/build');
    }
}
exports.default = programInit;
