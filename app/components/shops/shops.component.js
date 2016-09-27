shops.component('shops', {
    templateUrl: 'components/shops/shops.template.html',
    controller: function (Parties) {
        this.$routerOnActivate = () => {
            Parties.get(party => {
                this.shops = party.shops;
            });
        }
    }
});
