import { WebhookScope } from '../model/webhook-scope';

export class CreateWebhookParams {
    public url: string;
    public scope: WebhookScope;
}