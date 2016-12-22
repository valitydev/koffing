var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'vendorjs': [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/gentelella/build/js/custom.js',
            './node_modules/keycloak-js/dist/keycloak.js'
        ],
        'app': './src/main.ts'
    },

    resolve: {
        root: __dirname + '/node_modules',
        alias: {
            'Keycloak': 'keycloak-js/dist/keycloak.js',
            'jquery': 'jquery/dist/jquery',
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
                test: /(jquery.js$)|(keycloak.js$)/,
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
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
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
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills', 'vendorjs']
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