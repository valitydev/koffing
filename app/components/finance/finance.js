var finance = angular.module('finance', ['searchForm', 'loading', 'searchResult', 'paginate', 'resources']);

finance.constant('PAYMENT_STATUSES', {
    unpaid: 'Неоплаченный',
    cancelled: 'Отмененный',
    paid: 'Оплаченный',
    refunded: 'Возвращенный',
    fulfilled: 'Выполненный'
});

finance.component('finance', {
    templateUrl: 'components/finance/finance.html',
    controller: function (Invoices) {
        this.searchParams = {
            limit: 20,
            offset: 0
        };
        this.isLoading = false;
        this.isSearched = false;

        this.search = offset => {
            this.isLoading = true;
            this.isSearched = true;
            this.searchParams.offset = offset ? offset : 0;
            console.log(this.searchParams);
            Invoices.search(this.searchParams, result => {
                this.searchedInvoices = result.invoices;
                this.searchedInvoicesLength = result.length;
                this.isLoading = false;
            });
        };
    }
});
