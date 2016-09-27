shops.component('shops', {
    templateUrl: 'components/shops/shops.template.html',
    controller: function (Parties) {
        this.isLoading = true;

        this.$routerOnActivate = () => {
            Parties.get(party => {
                this.isLoading = false;
                this.shops = party.shops;
            });
        }
    }
});
