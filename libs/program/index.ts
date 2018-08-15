import {configFileList, default as EConfig} from '../settings/EConfig';
import * as path from 'path';
import commander = require('commander');
// import ICommand = commander.ICommand;
import start from '../../server'; 
export default function programInit(program: any){
    if(program.dev){
        program.config && (configFileList[0] = program.config);
        program.ignoreConfig && (configFileList[1] = program.ignoreConfig);
        start();
    }
    else if(program.build||program.dist||program.test){
        require('../../build/build');
    }
}