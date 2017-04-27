process.env.NODE_ENV = "development";
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var WebpackNotifierPlugin = require("webpack-notifier");
const configureWebpack = require("../common/webpack");
const aliases = require("../aliases.json");
const entries = require("../entries.json");
const paths = require("../paths.json");

const settings = new configureWebpack({
    server: true,
    loader: {
        ts: {
            configFileName: "tsconfig.json"
        },
        css: true,
        url: true,
        file: true
    },
    paths: paths,
    entries: entries,
    aliases: aliases
});

settings.webpack.output = {
    filename: "bundle.js"
};

settings.webpack.plugins = [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
        from: settings.paths.assets,
        to: "./"
    },
        {
            from: "../node_modules/bootstrap/dist",
            to: "./vendor/bootstrap"
        }
    ])
];

module.exports = settings.webpack;
