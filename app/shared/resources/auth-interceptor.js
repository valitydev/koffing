resources.factory('authInterceptor', function ($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.token) {
                Auth.updateToken(5).success(function () {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.token;
                    config.headers['X-Request-ID'] = 'KEK';
                    deferred.resolve(config);
                }).error(function () {
                    deferred.reject('Failed to refresh token');
                });
            } else {
                deferred.resolve(config);
            }
            return deferred.promise;
        }
    };
});
