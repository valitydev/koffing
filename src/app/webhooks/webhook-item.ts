import { Webhook } from 'koffing/backend/model/webhook';

export class WebhookListItem {
   public visible: boolean;
   public shopName: string;
   public webhook: Webhook;
}
