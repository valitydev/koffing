var searchResult = angular.module('searchResult', ['paginate']);

searchResult.component('searchResult', {
    templateUrl: 'components/finance/search-result/search-result.html',
    bindings: {
        searchedInvoices: '<'
    },
    controller: function () {
        this.itemsOnPage = 10;
    }
});
