import { Webhook } from 'koffing/backend/model/webhook';

export class WebhookTableItem {
    public visible: boolean = false;
    public webhook: Webhook;

    constructor(webhook: Webhook, visible?: boolean) {
        this.webhook = webhook;
        this.visible = visible;
    }
}
