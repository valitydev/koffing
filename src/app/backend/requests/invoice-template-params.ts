import { InvoiceTemplateCost } from '../model/invoice-template/invoice-template-cost';
import { LifetimeInterval } from '../model/invoice-template/lifetime-interval';

export class InvoiceTemplateParams {
    public shopID: string;
    public product: string;
    public description?: string;
    public lifetime: LifetimeInterval;
    public cost: InvoiceTemplateCost;
    public metadata?: object;
}
