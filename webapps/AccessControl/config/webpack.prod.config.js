const path = require('path');
// Webpack and its plugins
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
// const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = 'production';
const metadata = {
    baseUrl: '/',
    ENV: ENV
};

module.exports = {
    // debug: false,
    devtool: 'source-map',
    entry: {
        'app': './app/main.browser.ts',
        'vendor': './app/vendors.ts'
    },
    // metadata: metadata,
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'to-string!css',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css',
            exclude: /src/
        }, {
            test: /\.html$/,
            loader: 'html?caseSensitive=true&removeAttributeQuotes=false&minimize=true'
        }, {
            test: /\.ts$/,
            loader: 'ts',
            query: {
                compilerOptions: {
                    noEmit: false
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'babel-loader'
            ]
        }, {
            test: /\.woff$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.woff2$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.ttf$/,
            loader: "url?limit=10000&minetype=application/octet-stream"
        }, {
            test: /\.svg$/,
            loader: "url?limit=10000&minetype=image/svg+xml"
        }, {
            test: /\.eot$/,
            loader: "file"
        }],
        noParse: [/zone\.js\/dist\/.+/]
    },
    output: {
        path: helpers.root('js'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('') // location of your src
        ),
        // new CompressionPlugin({regExp: /\.css$|\.html$|\.js$|\.map$/, threshold: 1500}),
        // new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html'}]),
        // new DedupePlugin(),
        new DefinePlugin({
            'webpack': {
                'ENV': JSON.stringify(metadata.ENV)
            }
        }),
        // new OccurenceOrderPlugin(true),
        new UglifyJsPlugin({
            dead_code: true,
            unused: true,
            compress: {
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            comments: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    stats: {
        colors: true
    }
};
