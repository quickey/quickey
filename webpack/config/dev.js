const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./base");

module.exports = (config = {}) => merge(base(config), {
    mode: "development",

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development")
        })
    ]
});