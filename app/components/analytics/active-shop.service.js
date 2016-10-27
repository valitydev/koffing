analytics.factory('ActiveShopService', function () {
    return function () {

        this.setActive = shopId => localStorage.setItem('activeShop', shopId);

        this.getActive = () => localStorage.getItem('activeShop');

    }
});
