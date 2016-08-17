finance.component('finance', {
    templateUrl: 'components/finance/finance.html',
    controller: function (Invoices) {
        this.searchParams = {
            fromTime: moment().hours(0).minutes(0).seconds(0).format(),
            toTime: moment().format(),
            limit: 20,
            offset: 0
        };
        this.isLoading = false;
        this.isSearched = false;

        this.search = offset => {
            this.isLoading = true;
            this.isSearched = true;
            this.searchParams.offset = offset ? offset : 0;
            Invoices.search(this.searchParams, result => {
                this.searchedInvoices = result.invoices;
                this.totalCount = result.totalCount;
                this.isLoading = false;
            });
        };

        this.search();
    }
});
