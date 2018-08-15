export default async function start() {
    try{
       require('./build/dev-server')
    }
    catch (e) {
        console.error(e);
    }
}