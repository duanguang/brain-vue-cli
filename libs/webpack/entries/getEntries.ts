import EConfig from '../../settings/EConfig';
import { warning, log } from '../../utils/logs';
const {apps,projectType} = EConfig.getInstance();
function getApps(){
  let entries=[];
  return function(){
      if(entries.length>0){
          return entries
      }
      else{
        let envApps:any=process.env.apps;
        if(typeof envApps==='string'){
           envApps=envApps.split(',');
         }
         if(envApps.length>0){
          let ignore=[];   
          let entriesList= envApps.filter((item)=>{
              if(apps.findIndex((entity)=>entity===item)>-1){
                 return item;
              }else{
                  ignore.push(item);
              }      
           })
           function writeLog(){
              if(ignore.length===envApps){
                  warning(`当前无匹配应用  打包范围为[全部app]...`)
              }
              if(ignore.length>0){
                  warning(`无匹配应用[${ignore.join(',')}]...`)
              }
           }
           if(entriesList.length===apps.length||entriesList.length===0){
              log(`打包范围为[全部app]...`)
           }
           else{
              log(`打包应用[${entriesList.join(',')}]...`)
           }
           writeLog();
           entries=entriesList.length>0?entriesList:apps
           return entries;
         } 
      }
      entries=apps;
      return entries;
  } 
}
export const entries:any=getApps();
export function getEntries():any[]{
    let type = 'js'
    if(projectType==='ts'){
        type = projectType
    } 
    let entity= entries().reduce((prev, app) => {
      prev[app] = `./src/${app}/main.${type}`;
      return prev;
    }, {} as any);
    return entity;
}
