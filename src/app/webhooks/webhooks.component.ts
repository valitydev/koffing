import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookTableItem } from './webhook-table-item';

@Component({
    templateUrl: './webhooks.component.pug'
})
export class WebhooksComponent implements OnInit {
    public webhooksTableItems: WebhookTableItem[];

    private shopID: string;

    constructor(
        private webhooksService: WebhooksService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
            this.prepareTableItems();
        });
    }

    public toggleWebhookDetailsPanel(item: WebhookTableItem) {
        item.visible = !item.visible;
    }

    public createWebhook() {
        this.router.navigate(['shop', this.shopID, 'webhook', 'create']);
    }

    private prepareTableItems() {
        this.webhooksService.getWebhooks().subscribe(webhooks => {
            const filtered = webhooks.filter(webhook => webhook.scope.shopID === this.shopID);
            this.webhooksTableItems = filtered.map(webhook => new WebhookTableItem(webhook));
        });
    }
}
