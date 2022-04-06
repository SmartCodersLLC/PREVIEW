const path = require("path");

// require("babel-core/register");
// require("babel-polyfill");

module.exports = {
  mode: "production",
  // mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  //   entry: ["babel-polyfill", path.resolve(__dirname, "./src/index.js")],

  // optimization: {
  //     minimize: false,
  // },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "AVN_UMK_Check.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
