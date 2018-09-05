import EConfig from '../settings/EConfig';
const {apps} = EConfig.getInstance();
const program:any = require('commander');
let appsDev='';
if(program.args[0]){
  appsDev=program.args[0];
}
export function getApps(){
  if(appsDev){
    let appList=appsDev.split(',');
     return appList.filter((item)=>{
       if(apps.findIndex((entity)=>entity===item)>-1){
         return item;
       }      
     })
  }
  return apps; 
}