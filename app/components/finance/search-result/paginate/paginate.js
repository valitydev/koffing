paginate.component('paginate', {
    templateUrl: 'components/finance/search-result/paginate/paginate.html',
    bindings: {
        itemsOnPage: '<',
        itemsSize: '<',
        onChange: '&'
    },
    controller: function (Paginate) {
        this.$onChanges = () => {
            if (this.itemsSize) {
                const paginate = new Paginate(this.itemsSize, this.itemsOnPage);
                this.pages = paginate.pages;
                this.select = page => this.onChange({begin: paginate.activatePage(page)})
            }
        };
    }
});
