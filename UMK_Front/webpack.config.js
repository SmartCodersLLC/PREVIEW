const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('process');
const webpack = require('webpack');
require("babel-core/register");
require("babel-polyfill");


module.exports = {
    mode: "development",
    // entry: {
    //     main: path.resolve(__dirname, './src/App.js'),
    // },
    entry: ['babel-polyfill', path.resolve(__dirname, './src/App.js')],

    optimization: {
        minimize: false,
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'AVN_UMK_Check.js',
    },
    plugins: [
        new CleanWebpackPlugin(),

        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            
        ],
    },
}