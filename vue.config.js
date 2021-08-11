// const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // $vendors: path.join(__dirname, 'vendors'),
      },
    },
  },
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
      }
    }
  }
}