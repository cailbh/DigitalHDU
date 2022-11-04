module.exports = {
    //close eslint 防止报错
    lintOnSave: false,
    publicPath: "./",
    assetsDir: "static",
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://192.168.3.154:81',
                target: 'http://localhost:3000/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/we/*':{
              target: 'http://t.weather.sojson.com/api/weather/city/',   // 要代理的接口地址
              changeOrigin: true,                            // 允许跨域
              pathRewrite: { '^/we': '' }            // 接口名重写
            }
        },

    },
    configureWebpack: (config) => {
        config.module.rules.push({
          test: /\.glsl$/,
          use: [
            {
              loader: "webpack-glsl-loader",
            },
          ],
        });
      },
}
