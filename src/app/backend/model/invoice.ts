import { InvoiceLine } from './invoice-cart/invoice-line';

export class Invoice {
    public id: string;
    public shopID: string;
    public invoiceTemplateID: string;
    public createdAt: string;
    public dueDate: string;
    public amount: number;
    public currency: string;
    public metadata: object;
    public product: string;
    public description: string;
    public status: string;
    public reason: string;
    public cart: InvoiceLine[];
}
