var finance = angular.module('finance', ['searchForm', 'searchResult', 'resources']);

finance.component('finance', {
    templateUrl: 'components/finance/finance.html',
    bindings: {
        $router: '<'
    },
    controller: function (Invoices) {

        this.$routerOnActivate = route => {
            this.searchParams = route.params;
            if (Object.keys(this.searchParams).length) {
                this.searchedInvoices = Invoices.search(this.searchParams);
            }
        };

        this.search = () => {
            console.log('Search: ', this.searchParams);
            this.$router.navigate(['Finance', this.searchParams]);
            if (Object.keys(this.searchParams).length) {
                this.searchedInvoices = Invoices.search(this.searchParams);
            }
        };
    }
});
