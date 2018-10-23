const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const destinationDir = `./dist`;
const contextPath = path.join(__dirname, './src');

module.exports = {
    mode: "production",

    context: contextPath,

    target: "web",

    entry: {
        app: "index.ts"
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: [contextPath, "node_modules"]
    },

    module: {
        rules: [{
            test: /\.ts?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: "../tsconfig.json",
                    compilerOptions: {
                        target: "es5"
                    }
                }
            }],
            exclude: /node_modules/
        }]
    },

    output: {
        path: path.resolve(__dirname, destinationDir),
        filename: 'quickey.min.js',
        libraryTarget: 'umd',
        library: "Quickey"
    },

    plugins: [
        new CleanWebpackPlugin([destinationDir]),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};