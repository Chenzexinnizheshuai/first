const webpack_config = require('./webpack_config');
const proxy = require('http-proxy-middleware');
const config = {
    sass_config:{outputStyle: 'compressed'},
    gulp_server:{
        livereload: true,
        host:'localhost',
        port:8080,
        middleware:[
            proxy('/lagou', { // /lagou 这个是判断依据 当我们请求'http://localhost:8080/lagou/abc'的时候，这个代理就生效了
            target: 'https://m.lagou.com',// 配置目标服务器 当前服务器回去请求 https://m.lagou.com/lagou/abc
            changeOrigin: true,
            pathRewrite: { // https://m.lagou.com/abc
                '^/lagou': ''
            }
        })
        ]
    },
    webpack_config
}
module.exports = config;