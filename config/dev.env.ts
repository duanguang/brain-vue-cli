import * as merge  from 'webpack-merge';
var prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  environment:'"development"',
  apps:`"${process.env.apps}"`,
})