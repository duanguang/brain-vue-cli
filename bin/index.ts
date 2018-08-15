#!/usr/bin/env node
import { PRODUCTION,DEV } from '../libs/constants/constants';
import programInit from '../libs/program';
const program:any = require('commander');
const pkg = require('../package.json');
program
    .version(pkg.version)
    .option('-i, --init', '初始化构建项目')
    .option('-D, --dev', '运行Dev开发环境')
    .option('-d, --build', '运行部署开发环境')
    .option('-d, --test', '运行部署开发测试环境')
    .option('-d, --dist', '运行部署开发预发布环境')
    .option('-t, --tpl', '创建APP模板')
    .option('-c, --config', '指定配置文件')
    .option('-ic, --ignoreConfig', '指定用户自定义配置文件, 优先级大于<指定配置文件>')
    .parse(process.argv);
if (process.argv.length <= 2) {
    program.outputHelp();
}else{
    let NODE_ENV='开发环境';
    if(program.dev){
        process.env.environment=DEV;
        process.env.NODE_ENV=DEV;
    }
    else if(program.dist){
        process.env.environment='dist';
        process.env.NODE_ENV=PRODUCTION;
        NODE_ENV='预发布环境';
    }
    else if(program.build){
        process.env.environment=PRODUCTION;
        process.env.NODE_ENV=PRODUCTION;
        NODE_ENV='生产环境';
    }
    else if(program.test){
        process.env.environment='test';
        process.env.NODE_ENV=PRODUCTION;
        NODE_ENV='测试环境';
    }
    //process.env.NODE_ENV = program.build ? PRODUCTION : DEV;
    console.info(`welcome to use brain-vue-cli,the author:duanguang, 您当前编译环境为: ${process.env.NODE_ENV}[${NODE_ENV}]`);
    programInit(program);
}