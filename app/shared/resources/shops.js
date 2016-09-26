resources.factory('Shops', function ($resource, appConfig) {
    return $resource(appConfig.capiUrl + 'processing/shops/:shopID');
});
