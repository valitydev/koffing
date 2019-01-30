const webpackConfig = require('./webpack.test');

module.exports = function(config) {
    config.set({
        basePath: __dirname,
        frameworks: ['jasmine'],
        files: [{ pattern: 'karma-test-shim.js', watched: false }],
        preprocessors: {
            'karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
