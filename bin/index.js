#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../libs/constants/constants");
const program_1 = require("../libs/program");
const program = require('commander');
const pkg = require('../package.json');
program
    .version(pkg.version)
    .option('-i, --init', '初始化构建项目')
    .option('-D, --dev', '运行Dev开发环境')
    .option('-d, --build', '运行部署开发环境')
    .option('-t, --tpl', '创建APP模板')
    .option('-c, --config', '指定配置文件')
    .option('-ic, --ignoreConfig', '指定用户自定义配置文件, 优先级大于<指定配置文件>')
    .parse(process.argv);
if (process.argv.length <= 2) {
    program.outputHelp();
}
else {
    process.env.NODE_ENV = program.build ? constants_1.PRODUCTION : constants_1.DEV;
    console.info(`welcome to use bgood-cli,the author:duanguang, 您当前编译环境为: ${process.env.NODE_ENV}`);
    program_1.default(program);
}
