module.exports = {
  devServer: {
    proxy: {
      '/influxdb': {
        target: 'https://influx.spaces.deisi.ulusofona.pt',
        changeOrigin: true,
        pathRewrite: {
          '^/influxdb': '/api/v2/query',
        },
      },
    },
  },
}
