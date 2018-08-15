# brain-vue-cli
  基于vue by webpack 再次封装，提取少量配置，用来灵活处理打包问题，支持多入口，及多套环境配置指令方式切换。
# use
```
  npm i brain-vue-cli -g 或者npm i   brain-vue-cli --D
  package.json{
      "scripts":{
        "dev": "brain-vue-cli dev", //开发环境
        "build": "brain-vue-cli build",//生产环境
        "build:dist": "brain-vue-cli dist",//预发布环境
        "build:test": "brain-vue-cli test",//测试环境
        "build:report": "brain-vue-cli report" // 生成包大小分析服务
      }
  }
```
# 如何切换不同环境配置文件？
  在以前我们切换环境一般都是通过process.env.NODE_ENV值来判定，但这样子有一定的局限性，我们无法区分测试环境和线上环境，这时我们将无法快捷切换测试环境配置和线上环境配置，或许我们还能通过分支来区分，但这样一来将需要建立多个环境分支，有一定的分支管理成本，而且也不是非常好的办法。现在我们可以通过`process.env.environment`来区分不同环境的构建。
# process.env.environment
 - process.env.environment='dev' 开发环境
 - process.env.environment='build' 生产环境一般指线上环境
 - process.env.environment='dist'  预发布环境，此环境主要用来模拟线上环境数据
 - process.env.environment='test'  测试环境，测试环境中使用 

# webpack Support
- 2.x


