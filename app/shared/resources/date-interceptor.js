resources.factory('dateInterceptor', function ($q, appConfig) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (config.params) {
                if (config.params.fromTime) {
                    config.params.fromTime = moment(config.params.fromTime).format(appConfig.capiDatetimeFormat) + 'Z';
                }
                if (config.params.toTime) {
                    config.params.toTime = moment(config.params.toTime).format(appConfig.capiDatetimeFormat) + 'Z';
                }
            }
            deferred.resolve(config);
            return deferred.promise;
        }
    };
});
