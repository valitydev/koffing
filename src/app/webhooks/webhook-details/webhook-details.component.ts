import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Webhook } from 'koffing/backend/model/webhook';
import { WebhooksService } from 'koffing/backend/webhooks.service';
import { copy } from 'koffing/common/copy';

@Component({
    selector: 'kof-webhook-details',
    templateUrl: './webhook-details.component.pug',
    styleUrls: ['./webhook-details.component.less']
})
export class WebhooksListDetailsComponent {
    @Input()
    public webhook: Webhook;

    @Output()
    public onWebhookDelete: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('webhookPublicKey')
    public webhookPublicKey: ElementRef;

    constructor(private webhooksService: WebhooksService) {}

    public copy() {
        copy(this.webhookPublicKey.nativeElement);
    }

    public deleteWebhook() {
        this.webhooksService.deleteWebhookByID(this.webhook.id).subscribe(() => {
            this.onWebhookDelete.emit(true);
        });
    }
}
