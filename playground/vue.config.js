const UnusedAssetsWebpackPlugin = require('../packages/index')

module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    plugins: [
      new UnusedAssetsWebpackPlugin()
    ]
  }

}
