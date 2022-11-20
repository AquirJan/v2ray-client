// const path = require('path');
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // $vendors: path.join(__dirname, 'vendors'),
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    // port: '8081',
    open: true,
    // host: 'localhost',
    proxy: {
      '/xray': {
        target: 'http://localhost:8686', // dev
        // target: 'http://www.samojum.ml:3030', // produt
        logLevel: 'debug',
        changeOrigin: true
      },
      // '/xray': {
      //   target: 'http://www.samojum.ml', // produt
      //   logLevel: 'debug',
      //   changeOrigin: true
      // }
    },
  }
}