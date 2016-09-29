resources.factory('Categories', function ($resource, appConfig) {
    return $resource(`${appConfig.capiUrl}processing/categories/:categoryRef`, {
        categoryRef: '@categoryRef'
    });
});
