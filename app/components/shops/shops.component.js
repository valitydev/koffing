shops.component('shops', {
    templateUrl: 'components/shops/shops.template.html',
    controller: function (Parties, Shops) {

        const getParty = () => {
            this.isLoading = true;
            Parties.get(party => {
                this.isLoading = false;
                this.shops = party.shops;
            });
        };

        this.$routerOnActivate = () => getParty();

        this.activate = shop => {
            this.isLoading = true;
            const shops = new Shops();
            shops.$activate({shopID: shop.shopID}, () => getParty());
        };
    }
});
