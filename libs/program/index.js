"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EConfig_1 = require("../settings/EConfig");
// import ICommand = commander.ICommand;
const server_1 = require("../../server");
function programInit(program) {
    if (program.dev) {
        program.config && (EConfig_1.configFileList[0] = program.config);
        program.ignoreConfig && (EConfig_1.configFileList[1] = program.ignoreConfig);
        server_1.default();
    }
    else if (program.build || program.dist || program.test) {
        require('../../build/build');
    }
}
exports.default = programInit;
