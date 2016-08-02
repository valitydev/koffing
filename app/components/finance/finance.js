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
    bindings: {
        $router: '<'
    },
    controller: function (Invoices) {
        this.searchParams = {
            limit: 20,
            offset: 0
        };

        this.isLoading = false;
        this.isSearched = false;
/*        this.$routerOnActivate = route => {
            this.searchParams = route.params;
            if (Object.keys(this.searchParams).length) {
                this.searchedInvoices = Invoices.search(this.searchParams);
            } else {
                this.searchParams.limit = 10;
                this.searchParams.offset = 0;
            }
        };*/

        this.search = offset => {
            // this.$router.navigate(['Finance', this.searchParams]);
            this.isLoading = true;
            this.isSearched = true;
            this.searchParams.offset = offset ? offset : 0;
            console.log(this.searchParams);
            Invoices.search(this.searchParams, result => {
                this.searchedInvoices = result;
                this.isLoading = false;
            });
        };
    }
});
