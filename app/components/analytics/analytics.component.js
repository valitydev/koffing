analytics.component('analytics', {
    templateUrl: 'components/analytics/analytics.template.html',
    $routeConfig: [
        {path: '/:shopId/statistic', name: 'Dashboard', component: 'dashboard'},
        {path: '/:shopId/finance', name: 'Finance', component: 'finance'}
    ],
    bindings: {
        $router: '<'
    },
    controller: function (Parties, $location, ActiveShopService) {
        const activeShopService = new ActiveShopService();

        this.$routerOnActivate = () => {
            Parties.get(party => {
                this.isShopsExists = !!party.shops.length;
                if (!this.isShopsExists) {
                    return;
                }
                this.shopsDetails = _.map(party.shops, shop => ({
                    name: shop.shopDetails.name,
                    key: shop.shopID
                }));
                const activeShopId = activeShopService.getActive();
                if (activeShopId) {
                    this.selectedShopId = activeShopId;
                } else {
                    this.selectedShopId = resolveShopId(party.shops);
                }
                this.onSelect();
            });
        };

        function findParam(path, marker) {
            const res = _.chain(path)
                .split('/')
                .reduce((a, c) => ((c === marker || a === marker) ? c : a), '')
                .value();
            return res !== marker ? res : null;
        }

        function resolveShopId(shops) {
            const path = $location.path();
            const shopId = findParam(path, 'analytics');
            return shopId ? shopId : shops[0].shopID;
        }

        this.onSelect = () => {
            activeShopService.setActive(this.selectedShopId);
            const section = findParam($location.path(), this.selectedShopId);
            if (section === 'finance') {
                this.$router.navigate(['Finance', {shopId: this.selectedShopId}]);
            } else {
                this.$router.navigate(['Dashboard', {shopId: this.selectedShopId}]);
            }
        };

        this.isRouteActive = route => this.$router.isRouteActive(this.$router.generate(route));
    }
});
