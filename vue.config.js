const { defineConfig } = require('@vue/cli-service');
var baseUrl = 'http://110.42.145.66:5000'

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/literature': {
                target: baseUrl,
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                ws: true,
                pathRewrite: {
                    '^': ''
                }
            },
        }
    },
    publicPath:'./',

});
