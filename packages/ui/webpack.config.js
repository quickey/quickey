const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = require("../../webpack/config/dev");
const prod = require("../../webpack/config/prod");

const destDir = path.join(__dirname, './umd');
const contextPath = path.join(__dirname, './src');

const base = {
    entry: {
        app: "index.ts"
    },

    output: {
        library: ["Quickey", "ui"]
    },

    module: {
        rules: [{
            test: /\.scss?$/,
            exclude: /node_modules/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },

    externals: {
        "@quickey/core": {
            root: 'Quickey.core',
            commonjs2: '@quickey/core',
            commonjs: '@quickey/core',
            amd: '@quickey/core'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "quickey.css"
        })
    ]
}

module.exports = [
    merge(dev({ destDir, contextPath }), base, {
        output: {
            filename: 'quickey.ui.js'
        }
    }),

    merge(prod({ destDir, contextPath }), base, {
        output: {
            filename: 'quickey.ui.min.js'
        }
    })
];