const path = require('path');
// Webpack and its plugins
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
// const CopyWebpackPlugin  = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = 'development';

const metadata = {
    baseUrl: '/',
    ENV: ENV,
};

module.exports = {
    // debug: true,
    devtool: 'source-map',
    entry: {
        'app': './app/main.browser.ts',
        'vendor': './app/vendors.ts'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader']
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.ts$/,
            loader: 'ts',
            query: {
                compilerOptions: {
                    noEmit: false
                }
            }
        }, {
            test: /\.woff$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.svg$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }, {
            test: /\.eot$/,
            loader: 'file'
        }]
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
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('') // location of your src
        ),
        new DefinePlugin({
            'webpack': {
                'ENV': JSON.stringify(metadata.ENV)
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};
