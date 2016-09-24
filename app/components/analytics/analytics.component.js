dashboard.component('analytics', {
    templateUrl: 'components/analytics/analytics.template.html',
    $routeConfig: [
        {path: '/:shopId/statistic', name: 'Dashboard', component: 'dashboard'},
        {path: '/:shopId/finance', name: 'Finance', component: 'finance'}
    ],
    bindings: {
        $router: '<'
    },
    controller: function (Parties) {
        this.$routerOnActivate = route => {
            console.log(route);
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
            this.$router.navigate(['Dashboard', {shopId: this.selectedShopId}]);
        };

        this.isRouteActive = route => this.$router.isRouteActive(this.$router.generate(route));
    }
});
