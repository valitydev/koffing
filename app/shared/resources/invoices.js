resources.factory('Invoices', function ($resource, URL, Auth) {
    console.log(Auth);
    return $resource(URL.capiUrl + 'shops/:id/invoices', {
        id: 1
    }, {
        search: {method: 'GET', isArray: true}
    });
});