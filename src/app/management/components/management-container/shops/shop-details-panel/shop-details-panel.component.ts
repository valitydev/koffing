import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopService } from 'koffing/backend/services/shop.service';

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

    @Output()
    public shopSuspended = new EventEmitter();
    
    constructor(
        private shopService: ShopService
    ) { }
    
    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).then(() => {
            this.shopSuspended.emit();
        });
    }
}
