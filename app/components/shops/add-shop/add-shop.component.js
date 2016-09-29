shops.component('addShop', {
    templateUrl: 'components/shops/add-shop/add-shop.template.html',
    bindings: {
        $router: '<'
    },
    controller: function (Shops) {
        this.args = {};
        this.isLoading = false;

        const back = () => {
            this.args = {};
            this.isLoading = false;
            this.$router.navigate(['Shops']);
        };

        this.createClaim = form => {
            if (form.$valid) {
                this.isLoading = true;
                Shops.save(this.args, () => back());
            }
        };

        this.hasError = field => field.$dirty && field.$invalid;
    }
});
