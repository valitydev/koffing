shops.component('shopCreation', {
    templateUrl: 'components/shops/claims/shop-creation/shop-creation.template.html',
    bindings: {
        changeset: '<'
    },
    controller: function () {
        this.showPanel = false;

        this.show = () => this.showPanel = !this.showPanel;
        this.shop = this.changeset.shop;
    }
});
