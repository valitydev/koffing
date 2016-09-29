paginate.component('paginate', {
    templateUrl: 'components/analytics/finance/paginate/paginate.html',
    bindings: {
        limit: '<',
        size: '<',
        offset: '<',
        onChange: '&',
        pagesOnScreen: '<'
    },
    controller: function (Paginate) {
        this.$onChanges = () => {
            if (this.size) {
                const paginate = new Paginate(this.size, this.limit, this.offset, this.pagesOnScreen, this.onChange);

                this.pages = paginate.pages;

                this.pageOffset = paginate.calcPageOffset();

                this.select = paginate.activatePage;

                this.forward = paginate.forward;

                this.back = paginate.back;
            }
        };
    }
});
