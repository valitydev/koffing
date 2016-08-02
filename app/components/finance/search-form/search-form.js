var searchForm = angular.module('searchForm', ['datepicker', 'customSelect']);

searchForm.component('searchForm', {
    templateUrl: 'components/finance/search-form/search-form.html',
    bindings: {
        searchParams: '=',
        onSearch: '&'
    }
});
