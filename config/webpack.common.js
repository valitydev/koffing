const webpack = require('webpack');
const aot = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');
const path = require('path');

module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        vendorjs: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/keycloak-js/dist/keycloak.js',
            './node_modules/suggestions-jquery/dist/js/jquery.suggestions.js',
            './node_modules/xlsx-style/dist/xlsx.core.min.js'
        ],
        app: './src/main.ts'
    },

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            Keycloak: 'keycloak-js/dist/keycloak.js',
            jquery: 'jquery/dist/jquery',
            suggestions: 'suggestions-jquery/dist/js/jquery.suggestions.js',
            koffing: __dirname + '/../src/app'
        },
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /(jquery.js$)|(keycloak.js$)|(suggestions.js$)|(xlsx.core.min.js$)/,
                use: 'script-loader'
            },
            {
                test: /\.ts$/,
                use: ['@ngtools/webpack', 'tslint-loader']
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.less$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap', 'less-loader']
                })
            },
            {
                test: /\.less$/,
                include: helpers.root('src', 'app'),
                use: ['raw-loader', 'less-loader']
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },

    plugins: [
        new aot.AotPlugin({
            tsConfigPath: 'tsconfig.json',
            entryModule: helpers.root('src/app/app.module#AppModule'),
            skipCodeGeneration: true
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)/,
            path.resolve(__dirname, '../src')
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'vendorjs', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug'
        }),
        new CopyWebpackPlugin([
            {
                from: 'config/runtime'
            }
        ])
    ]
};
