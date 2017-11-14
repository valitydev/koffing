import { LifetimeInterval } from '../model/invoice-template/lifetime-interval';
import { InvoiceTemplateDetails } from '../model/invoice-template/invoice-template-details';

export class InvoiceTemplateParams {
    public shopID: string;
    public description?: string;
    public lifetime: LifetimeInterval;
    public details: InvoiceTemplateDetails;
    public metadata?: object;
}
