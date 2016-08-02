searchResult.component('searchResult', {
    templateUrl: 'components/finance/search-result/search-result.html',
    require: {
        loadingCtrl: '^loading'
    },
    bindings: {
        searchedInvoices: '<',
        offset: '<',
        limit: '<'
    }
});
