resources.factory('Parties', function ($resource, appConfig) {
    return $resource(appConfig.capiUrl + 'processing/me');
});
