const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            koffing: __dirname + '/../src/app'
        },
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'tslint-loader']
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        )
    ]
};
