const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require ('optimize-css-assets-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');

const config = {
    entry: {
        bundle: "./src/index.js",
        vendor : [
            "@fortawesome/fontawesome-free",
            "animate.css",
            "axios",
            "bootstrap",
            "jquery",
            "popper.js",
            "react",
            "react-dom",
            "react-redux",
            "react-router-dom",
            "redux",
            "redux-thunk",
            "socket.io-client"
        ]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2|eot|wav|mp3)$/,
                loader: "file-loader"
            },
            {
                test: /\.bundle\.js$/,
                use: "bundle-loader"
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OptimizeCssAssetsWebpackPlugin (),
        new HtmlWebpackPlugin ({
            template: "./public/index.html"
        }),
        new UglifyWebpackPlugin ({
            cache: true,
            uglifyOptions: {
                compress: true
            }
        }),
        new MiniCssExtractPlugin ({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        })
    ],
    devServer: {
        port: 3000,
        open: true
    }
}

module.exports = config;