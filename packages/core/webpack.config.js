const path = require("path");
const merge = require("webpack-merge");
const dev = require("../../webpack/config/dev");
const prod = require("../../webpack/config/prod");

const destDir = path.join(__dirname, './umd');
const contextPath = path.join(__dirname, './src');

const base = {
    entry: {
        app: "index.ts"
    },

    output: {
        library: ["Quickey", "core"]
    }
}

module.exports = [
    merge(dev({ destDir, contextPath }), base, {
        output: {
            filename: 'quickey.development.min.js'
        }
    }),

    merge(prod({ destDir, contextPath }), base, {
        output: {
            filename: 'quickey.production.min.js'
        }
    })
];