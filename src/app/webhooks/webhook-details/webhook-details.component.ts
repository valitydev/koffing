import { Component, OnInit, Input } from '@angular/core';

import { ShopService } from 'koffing/backend/shop.service';
import { WebhookListItem } from '../webhook-item';

@Component({
    selector: 'kof-webhook-list-details',
    templateUrl: './webhook-details.component.pug',
})
export class WebhooksListDetailsComponent implements OnInit {

    @Input()
    public item: WebhookListItem;

    constructor(private shopService: ShopService) { }

    public ngOnInit() {
        if (this.item.visible && !this.item.shopName) {
            this.shopService.getShopByID(this.item.webhook.scope.shopID)
                .subscribe((shop) => this.item.shopName = shop.details.name);
        }
    }
}
