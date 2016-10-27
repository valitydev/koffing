const searchForm = angular.module('searchForm', ['datepicker', 'customSelect']);

searchForm.component('searchForm', {
    templateUrl: 'components/analytics/finance/search-form/search-form.html',
    bindings: {
        searchParams: '=',
        onSearch: '&'
    },
    controller: function () {
        this.searchParams.fromTime = moment(this.toTime).subtract(1, 'M').hours(0).minutes(0).seconds(0).milliseconds(0).format();
    }
});
