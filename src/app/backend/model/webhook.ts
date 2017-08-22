import { WebhookScope } from './webhook-scope';

export class Webhook {
    public id: string;
    public active: boolean;
    public scope: WebhookScope;
    public url: string;
    public publicKey: string;
}
