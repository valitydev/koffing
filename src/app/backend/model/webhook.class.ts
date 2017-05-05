import { WebhookScope } from './webhook-scope.class';

export class Webhook {
    public id: string;
    public active: boolean;
    public scope: WebhookScope;
    public url: string;
    public publicKey: string;
}