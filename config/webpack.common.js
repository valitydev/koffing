const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'vendorjs': [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/keycloak-js/dist/keycloak.js',
            './node_modules/suggestions-jquery/dist/js/jquery.suggestions.js',
            './node_modules/xlsx-style/dist/xlsx.core.min.js'
        ],
        'app': './src/main.ts'
    },

    resolve: {
        root: __dirname + '/node_modules',
        alias: {
            'Keycloak': 'keycloak-js/dist/keycloak.js',
            'jquery': 'jquery/dist/jquery',
            'suggestions': 'suggestions-jquery/dist/js/jquery.suggestions.js',
            'koffing': __dirname + '/../src/app'
        },
        extensions: ['', '.ts', '.js']
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader'
            }
        ],
        loaders: [
            {
                test: /(jquery.js$)|(keycloak.js$)|(suggestions.js$)|(xlsx.core.min.js$)/,
                loader: 'script-loader'
            },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.pug$/,
                include: /\.pug/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },

            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.less$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'less'])
            },
            {
                test: /\.less$/,
                include: helpers.root('src', 'app'),
                loader: 'raw!less'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'vendorjs', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug'
        }),
        new CopyWebpackPlugin([{
            from: 'config/runtime'
        }])
    ]
};