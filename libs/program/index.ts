// import {configFileList, default as EConfig} from '../settings/EConfig';
// import * as path from 'path';
// import commander = require('commander');
// import ICommand = commander.ICommand;
import start from '../../server'; 
export default function programInit(env: string){
    if(env==='dev'){
        // program.config && (configFileList[0] = program.config);
        // program.ignoreConfig && (configFileList[1] = program.ignoreConfig);
        start();
    }
    else if(env==='prod'||env==='dist'||env==='test'){
        require('../../build/build');
    }
}