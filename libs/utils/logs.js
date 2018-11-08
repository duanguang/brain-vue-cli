"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
function warning(message) {
    console.warn(chalk.yellow(`[brain-vue]:${message}`));
}
exports.warning = warning;
function log(info, color = 'green') {
    /* istanbul ignore next */
    console.log(chalk.blue(`[brain-vue]:${chalk[color](info)}`));
}
exports.log = log;
