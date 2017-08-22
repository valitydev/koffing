import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Webhook } from 'koffing/backend/model/webhook';
import { WebhooksService } from 'koffing/backend/webhooks.service';

@Component({
    selector: 'kof-webhook-details',
    templateUrl: './webhook-details.component.pug',
})
export class WebhooksListDetailsComponent {

    @Input()
    public webhook: Webhook;

    @Output()
    public onWebhookDelete: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('webhookPublicKey')
    public webhookPublicKey: ElementRef;

    constructor(private webhooksService: WebhooksService) { }

    public copy() {
        this.webhookPublicKey.nativeElement.select();
        document.execCommand('copy');
    }

    public deleteWebhook() {
        this.webhooksService.deleteWebhookByID(this.webhook.id).subscribe(() => {
            this.onWebhookDelete.emit(true);
        });
    }
}
