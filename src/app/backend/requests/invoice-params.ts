import { InvoiceLine } from '../model/invoice-cart/invoice-line';

export class InvoiceParams {
    public shopID: string;
    public dueDate: string;
    public amount?: number;
    public currency: string;
    public product: string;
    public description?: string;
    public cart?: InvoiceLine[];
    public metadata: object;
}
