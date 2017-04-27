const path = require("path");
const Finder = require("../util/PathFinder");
const Arrays = require("../util/Arrays");
function configure(settings){
    const finder = new Finder(settings.basePath);
    const paths = finder.getAll(settings.paths);

    const resolve = {
        modules: [
            paths.app,
            paths.node_modules
        ],
        enforceModuleExtension: false,
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    };

    if(paths.lib) {
        resolve.modules.push(paths.lib);
    }

    if(settings.aliases) {
        resolve.alias = finder.getAll(settings.aliases);
    }
    Arrays.addAllAsUniqueToArray(settings.modules, resolve.modules);
    Arrays.addAllAsUniqueToArray(settings.extensions, resolve.extensions);

    // configure module
    const modules = {
        rules: []
    };

  if(settings.loader) {
        const loader = settings.loader;
        if(loader.ts) {
            modules.rules.push({
                test: /\.tsx?$/, use: 'ts-loader?' + JSON.stringify(loader.ts)
            }
            );
        }
        if(loader.css) {
            modules.rules.push({test: /\.css$/, use: ["style-loader","css-loader"]});
        }
        if(loader.file) {
            modules.rules.push({test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: "file-loader", include: /fonts/});
        }
        if(loader.url) {
            modules.rules.push({test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, use: "url?limit=100000&name=[name].[ext]"})
        }
    }
    Arrays.addAllAsUniqueToArray(settings.rules, modules.rules);
    var server = null;
    if(settings.server) {
        server = {
            historyApiFallback: true,
            hot: true,
            inline: true,

            // display only errors to reduce the amount of output
            // stats: "errors-only",

            // parse host and port from env so this is easy
            // to customize
            // host: process.env.HOST,
            host: "0.0.0.0",
            port: process.env.PORT || 8080
        };
        if(settings.server !== true) {
            merge(settings.server, settings)
        }
    }

    settings = {
        webpack: {
            entry: settings.entries,
            devtool: "source-map",
            context: paths.app,
            resolve: resolve,
            module: modules,
            plugins: []
        },
        paths: paths
    };

    if(server) {
        settings.devServer = server
    }
   return settings;
}

module.exports = configure;
