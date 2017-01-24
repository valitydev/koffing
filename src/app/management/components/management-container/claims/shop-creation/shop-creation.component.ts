import { Component, Input } from '@angular/core';

import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    selector: 'kof-shop-creation',
    templateUrl: 'shop-creation.component.pug'
})
export class ShopCreationComponent {

    @Input()
    public shop: Shop;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}
