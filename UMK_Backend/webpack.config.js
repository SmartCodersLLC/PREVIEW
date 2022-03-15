var path = require("path");
// const BytenodeWebpackPlugin = require("bytenode-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "production",
  // mode: "development",
  entry: "./bin/www",
//   entry: "./app/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname),
    filename: "server.js",
    libraryTarget: 'var',
    library: 'app'
   }
//   ,  plugins: [new BytenodeWebpackPlugin()],
};
