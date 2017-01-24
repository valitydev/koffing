import { Component, Input } from '@angular/core';

import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    selector: 'kof-shop-modification',
    templateUrl: 'shop-modification.component.pug'
})
export class ShopModificationComponent {

    @Input()
    public shop: Shop;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}
