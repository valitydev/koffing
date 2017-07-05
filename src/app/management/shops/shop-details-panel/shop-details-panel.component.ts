import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Shop } from 'koffing/backend/model/shop';
import { ShopService } from 'koffing/backend/shop.service';

@Component({
    selector: 'kof-shop-details-panel',
    templateUrl: 'shop-details-panel.component.pug',
    styleUrls: [`
        .public-key-container {
            max-width: 900px;
            word-wrap: break-word;
        }`]
})
export class ShopDetailsPanelComponent {
    
    @Input()
    public shop: Shop;

    @Input()
    public claimFound: boolean = false;

    @Output()
    public onChange = new EventEmitter();
    
    constructor(
        private shopService: ShopService
    ) { }
    
    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).then(() => this.onChange.emit());
    }

    public activateShop() {
        this.shopService.activateShop(this.shop.id).then(() => this.onChange.emit());
    }
}
