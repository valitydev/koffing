var searchForm = angular.module('searchForm', ['datepicker', 'customSelect']);

searchForm.component('searchForm', {
    templateUrl: 'components/finance/search-form/search-form.html',
    bindings: {
        searchParams: '=',
        onSearch: '&'
    },
    controller: function () {
        this.statuses = [
            {key: 'unpaid', name: 'Неоплаченный'},
            {key: 'cancelled', name: 'Отмененный'},
            {key: 'paid', name: 'Оплаченный'},
            {key: 'refunded', name: 'Возвращенный'},
            {key: 'fulfilled', name: 'Выполненный'}
        ];

        this.isParams = () => Object.keys(this.searchParams).length;
    }
});
