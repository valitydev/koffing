resources.factory('dateInterceptor', function ($q) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (config.params) {
                if (config.params.fromTime) {
                    config.params.fromTime = moment(config.params.fromTime).utc().format();
                }
                if (config.params.toTime) {
                    config.params.toTime = moment(config.params.toTime).utc().format();
                }
            }
            deferred.resolve(config);
            return deferred.promise;
        }
    };
});
