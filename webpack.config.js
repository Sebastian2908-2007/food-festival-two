// require native node js module "path'
const path = require('path');
const  webpack  = require('webpack');

// export configuration object note: as of webpack 4 this is no longer neccissary... but im gonna do it anyway
module.exports = {
    // entry is the root of the bundle and the beggining of the dependency graph
    entry: './assets/js/script.js',
    // after code from entry point is bundled it will be out puted to dist directory with a name of main.bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // below we specify plugins
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    // this will run in production by default
    mode: 'development'
};