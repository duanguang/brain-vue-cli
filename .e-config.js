module.exports = {
    name: "test",
    open: true,
    defaultPort: 8000,
    server: "0.0.0.0",
    imageInLineSize: 8192,
    publicPath: "/public/",
    chunkhash:true,
    disableEslint:false,
    devServer: {
        proxy: {}
        /*proxy: [{
         context: ['/**', '!/static/**', '!/webpack/**', '!/webpack-dev-server/**', '!/sockjs-node/**', '!/index.html'],
         target: 'http://tstmanage.360kad.com
         ',
         changeOrigin: true
         }]*/
    },
    postcss: {
        autoprefixer: {
            /**
             * 参考dora配置
             */
            browsers: [
                "last 2 versions",
                "Firefox ESR",
                "> 1%",
                "ie >= 8"
            ]
        }
    },
    webpack: {
    },
    babel: {
        include:['node_modules/bgood-widget']
    },
    htmlWebpackPlugin: {
        title: "",
    },
    apps: ['app1','app2']
};