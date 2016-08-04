paginate.component('paginate', {
    templateUrl: 'components/finance/paginate/paginate.html',
    bindings: {
        limit: '<',
        size: '<',
        offset: '<',
        onChange: '&'
    },
    controller: function (Paginate) {
        this.$onChanges = () => {
            if (this.size) {
                const paginate = new Paginate(this.size, this.limit, this.offset);

                this.pages = paginate.pages;

                function change(onChange, func, args) {
                    var res = args ? func(args) : func();
                    onChange({offset: res ? res.offset : 0});
                }

                this.select = page => change(this.onChange, paginate.activatePage, page);

                this.forward = () => change(this.onChange, paginate.forward);

                this.back = () => change(this.onChange, paginate.back);
            }
        };
    }
});
