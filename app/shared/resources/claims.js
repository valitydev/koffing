resources.factory('Claims', function ($resource, appConfig) {
    return $resource(`${appConfig.capiUrl}/processing/claims/:claimID/:action`, {
        claimID: '@claimID'
    }, {
        revoke: {method: 'POST', params: {action: 'revoke'}}
    });
});
