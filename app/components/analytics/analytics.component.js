dashboard.component('analytics', {
    templateUrl: 'components/analytics/analytics.template.html',
    $routeConfig: [
        {path: '/:shopId/statistic', name: 'Statistic', component: 'statistic'}
    ],
    bindings: {
        $router: '<'
    },
    controller: function (Parties) {
        this.$routerOnActivate = () => {
            Parties.get(party => {
                this.party = party;
                this.shopsDetails = _.map(this.party.shops, shop => ({
                    name: shop.shopDetails.name,
                    key: shop.shopID
                }));
            });
        };

        this.onShopSelect = () => {
            console.log(this.selectedShopId);
        };

        this.showStatistic = () => {
            this.$router.navigate(['Statistic', {shopId: this.selectedShopId}]);
        }
    }
});
