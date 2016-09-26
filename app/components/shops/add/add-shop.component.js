shops.component('addShop', {
    templateUrl: 'components/shops/add/add-shop.template.html',
    bindings: {
        $router: '<'
    },
    controller: function (Shops) {
        this.args = {};
        this.isLoading = false;

        this.create = (form) => {
            if (form.$valid) {
                this.isLoading = true;
                Shops.save(this.args, () => {
                    this.args = {};
                    this.isLoading = false;
                    this.$router.navigate(['Shops']);
                });
            }
        };

        this.hasError = field => field.$dirty && field.$invalid;
    }
});
