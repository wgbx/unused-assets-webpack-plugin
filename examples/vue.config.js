const UnusedFilesWebpackPlugin = require("../packages/index");

module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    plugins: [new UnusedFilesWebpackPlugin({
      exclude: ['.ts']
    })],
  },
};
