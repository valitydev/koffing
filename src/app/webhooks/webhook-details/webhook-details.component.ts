import { Component, OnInit, Input } from '@angular/core';

import { ShopService } from 'koffing/backend/backend.module';
import { WebhookListItem } from '../webhook-item.class';

@Component({
    selector: 'kof-webhook-list-details',
    templateUrl: './webhook-details.component.pug',
})
export class WebhooksListDetailsComponent implements OnInit {

    @Input()
    public item: WebhookListItem;

    constructor(private shopService: ShopService) {}

    public ngOnInit() {
        if (this.item.visible && !this.item.shopName) {
            this.shopService.getShop(this.item.webhook.scope.shopID).then((result) => {
               this.item.shopName = result.details.name;
            });
        }
    }
}
