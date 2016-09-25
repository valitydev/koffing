dashboard.component('analytics', {
    templateUrl: 'components/analytics/analytics.template.html',
    $routeConfig: [
        {path: '/:shopId/statistic', name: 'Dashboard', component: 'dashboard'},
        {path: '/:shopId/finance', name: 'Finance', component: 'finance'}
    ],
    bindings: {
        $router: '<'
    },
    controller: function (Parties, $location) {
        this.$routerOnActivate = () => {
            const path = $location.path();
            this.selectedShopId = findParam(path, 'analytics');
            Parties.get(party => {
                this.shopsDetails = _.map(party.shops, shop => ({
                    name: shop.shopDetails.name,
                    key: shop.shopID
                }));
            });
        };

        function findParam(path, marker) {
            const res = _.chain(path)
                .split('/')
                .reduce((a, c) => ((c === marker || a === marker) ? c : a), '')
                .value();
            return res !== marker ? res : null;
        }

        this.onSelect = () => {
            this.$router.navigate(['Dashboard', {shopId: this.selectedShopId}]);
        };

        this.isRouteActive = route => this.$router.isRouteActive(this.$router.generate(route));
    }
});
