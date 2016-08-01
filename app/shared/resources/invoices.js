resources.factory('Invoices', function ($resource, URL) {
    return $resource(URL.capiUrl + 'shops/:id/invoices', {
        id: 1
    }, {
        search: {method: 'GET', isArray: true}
    });
});