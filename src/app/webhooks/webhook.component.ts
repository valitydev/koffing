import { Component, OnInit } from '@angular/core';

import { WebhooksService } from 'koffing/backend/backend.module';
import { Webhook } from 'koffing/backend/model/webhook.class';
import { WebhookListItem } from './webhook-item.class';

@Component({
    selector: 'kof-webhook-list',
    templateUrl: './webhooks.component.pug',
})
export class WebhookComponent implements OnInit {

    public webhooksList: WebhookListItem[];

    constructor(private webhooksService: WebhooksService) {}

    public transformStatus(status: boolean) {
        return status ? 'Активен' : 'Неактивен';
    }

    public makeEvents(events: string[]) {
        return events.join(', ');
    }

    public toggleWebhook(item: WebhookListItem) {
        item.visible = !item.visible;
    }

    public ngOnInit() {
         this.webhooksService.getWebhooks().subscribe(result => {
             this.webhooksList = this.createWebhooksList(result);
        });
    }

    public deleteWebhook(id: string) {
        this.webhooksService.deleteWebhookByID(id)
            .switchMap(() => this.webhooksService.getWebhooks())
            .subscribe((result) => {
                this.webhooksList = this.createWebhooksList(result);
             });
    }

    private createWebhooksList(webhooks: Webhook[]) {
        return webhooks.map((webhook) => {
            return {
                visible: false,
                shopName: '',
                webhook
            };
        });
    }
}
