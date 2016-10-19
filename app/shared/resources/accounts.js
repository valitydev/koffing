resources.factory('Accounts', function ($resource, appConfig) {
    return $resource(`${appConfig.capiUrl}/processing/shops/:shopID/accounts/:accountID`, {
        shopID: '@shopID',
        accountID: '@accountID'
    });
});
