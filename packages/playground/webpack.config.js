const webpack = require('webpack');
const package = require('./package.json');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const contextPath = path.join(__dirname, './src');
const appEnv = process.env.NODE_ENV || 'development';
const isProduction = appEnv == 'production';
const isDevelopment = appEnv == 'development';
const destinationDir = (isProduction) ? `./public` : `./build`;

const config = {

    mode: appEnv,

    devtool: "eval-source-map",

    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0"
    },

    context: contextPath,

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    filename: "common.js",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 1
                }
            }
        }
    },

    entry: {
        app: "index.ts"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".vue"],

        modules: [contextPath, "node_modules"],

        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },

    output: {
        path: path.resolve(__dirname, destinationDir),
        publicPath: "/",
        chunkFilename: '[name].js',
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.scss?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        configFile: "../tsconfig.json"
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(appEnv),
            'process.env.VERSION': JSON.stringify(package.version)
        })
    ]
};

module.exports = config;