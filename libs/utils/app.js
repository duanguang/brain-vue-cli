"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EConfig_1 = require("../settings/EConfig");
const { apps } = EConfig_1.default.getInstance();
const program = require('commander');
let appsDev = '';
if (program.args[0]) {
    appsDev = program.args[0];
}
function getApps() {
    if (appsDev) {
        let appList = appsDev.split(',');
        return appList.filter((item) => {
            if (apps.findIndex((entity) => entity === item) > -1) {
                return item;
            }
        });
    }
    return apps;
}
exports.getApps = getApps;
