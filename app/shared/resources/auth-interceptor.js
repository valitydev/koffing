resources.factory('authInterceptor', function ($q, Auth) {
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.token) {
                Auth.updateToken(5).success(function () {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${Auth.token}`;
                    config.headers['X-Request-ID'] = guid();
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
