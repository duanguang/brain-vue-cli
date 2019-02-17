var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
import EConfig from '../libs/settings/EConfig';
import { getEntries } from '../libs/webpack/entries/getEntries';
const tsImportPluginFactory = require('ts-import-plugin')
const {apps,babel:{include},projectType,imageInLineSize,disableEslint,webpack:{happypack}} = EConfig.getInstance();
function resolve (dir) {
  return path.join(process.cwd(),'./',dir)
  //return path.join(__dirname, '..', dir)
}
let rulesEslint=[];
if(!disableEslint){
  rulesEslint.push({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  })
}
let rule=[];
if(happypack){
  rule=[{
    test: /\.js$/,
    loader: 'happypack/loader?id=js',
    include: [resolve('src'), resolve('test'),...include.map((item)=>resolve(item))]
  },
  {
    test: /\.vue$/,
    loader: 'happypack/loader?id=vuejs',
    // exclude: /node_modules/,
  }]
}else{
  if(projectType==='ts'){
     rule.push(
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig, {
              loaders: {
              //   ts: 'ts-loader',
                ts: 'babel-loader!ts-loader'
              }
            })

       }
     )
  }
  else if(projectType==='js'){
    rule.push({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    })
  }
  rule.push({
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test'),...include.map((item)=>resolve(item))]
  })
}
let tsRule=[]
if(projectType==='ts'){
   tsRule = [{
    test: /\.ts$/,
    exclude: /node_modules|vue\/src/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    //   transpileOnly: true,
    //   getCustomTransformers: () => ({
    //         before: [ tsImportPluginFactory([{
    //             libraryName: 'ant-design-vue',
    //             libraryDirectory: 'lib',
    //             style: "css",
    //             camel2DashComponentName: true,
    //         }]) ]
    //    }),
    //    compilerOptions: {
    //         module: 'es2015'
    //    }
    }
  },
  {
      test: /\.tsx$/,
      exclude: /node_modules/,
      // include: [path.resolve(__dirname, 'node_modules/ant-design-vue'),resolve('src')],
      use: [
          'babel-loader',
          {
              loader: 'ts-loader',
              options: {
                  // 自动将所有.vue文件转化为.vue.tsx文件
                  appendTsSuffixTo: [/\.vue$/]
                }
          }
      ],
      
    }]
}
module.exports = {
  // entry: {
  //   app: './src/app1/main.js'
  // },
  entry:getEntries(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.ts','.tsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      ...rule,
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src'), resolve('test'),...include.map((item)=>resolve(item))]
      // },
      { test: /iview.src.*?js$/, loader: 'babel-loader' },
      ...tsRule,
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: imageInLineSize,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: imageInLineSize,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: imageInLineSize,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ].concat(rulesEslint)
  }
}
