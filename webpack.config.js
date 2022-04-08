// require native node js module "path'
const path = require('path');
const  webpack  = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackPwaMAnifest = require("webpack-pwa-manifest");

// export configuration object note: as of webpack 4 this is no longer neccissary... but im gonna do it anyway
module.exports = {
    // entry is the root of the bundle and the beggining of the dependency graph
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    // after code from entry point is bundled it will be out puted to dist directory with a name of main.bundle.js
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // the settings for dev server below are essential for running webpack-dev-server
    devServer: {
        //....//
        static: {                               
          directory: path.join(__dirname, './'),  
          watch: true
        }
     },

    module: {
        rules: [
            {
                test: /\.jpg$/i,
               type: "asset/resource",
               generator : {
                   // this gives my altered file its same name when outputted to /dist
                filename : 'images/[name][ext][query]'
              },
              use:[
                  {
                      loader: 'image-webpack-loader'
                  }
              ]
           
            },
            
         
            
                 
           
        ]
    },
    // below we specify plugins
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", //the report outputs to an HTML file in the dist folder
        }),
        new webpackPwaMAnifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An App that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                size: [96, 128, 192, 256, 384,512],
                destination: path.join("assets","icons")
            }]
        })
    ],
    // this will run in production by default
    mode: 'development'
};