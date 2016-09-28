shops.component('shopModification', {
    templateUrl: 'components/shops/claims/shop-modification/shop-modification.template.html',
    bindings: {
        changeset: '<'
    },
    controller: function () {
        this.showPanel = false;
        this.isModification = this.changeset.details.modificationType === 'ShopModification';
        this.details = this.changeset.details.details;

        this.show = () => this.showPanel = !this.showPanel;
    }
});
