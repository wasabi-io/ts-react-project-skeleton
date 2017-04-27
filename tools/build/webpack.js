process.env.NODE_ENV = "development";
const webpack = require("webpack");
const package = require("../../package.json");
const FileChanger = require("webpack-file-changer");
const WebpackNotifierPlugin = require("webpack-notifier");
const configureWebpack = require("../common/webpack");
const aliases = require("../aliases.json");
const entries = require("../entries.json");
const paths = require("../paths.json");

const settings = new configureWebpack({
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
    path: settings.paths.www,
    filename: "[name].[hash].js"
};

const fileChanger = new FileChanger({
    move: [
        {
            from: settings.paths.assets,
            to: './'
        }, {
            from: "./node_modules/bootstrap/dist",
            to: "./vendor/bootstrap"
        }
    ],
    change: [
        {
            file: "./index.html",
            parameters: {
                "\\$VERSION": package.version,
                "\\$BUILD_TIME": new Date(),
                "bundle\\.js": "app.[hash].js"
            }
        }
    ]
});
settings.webpack.plugins = [
    new WebpackNotifierPlugin({alwaysNotify: true}),
    new webpack.HotModuleReplacementPlugin(),
    fileChanger
];

module.exports = settings.webpack;
