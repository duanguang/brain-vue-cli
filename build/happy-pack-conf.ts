import EConfig from '../libs/settings/EConfig';
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var vueLoaderConfig = require('./vue-loader.conf')
const {webpack:{happypack}} = EConfig.getInstance();
export const plugins=happypack?[
    new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [ {
            path: 'babel-loader',
            query: { cacheDirectory: true }
          } ]
      }),
      new HappyPack({
        id: 'vuejs',
        threadPool: happyThreadPool,
        loaders: [{
            loader: 'vue-loader',
            options: vueLoaderConfig,
          }]
      })
]:[];