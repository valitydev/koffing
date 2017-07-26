import { InvoiceParams } from './invoice-params';

export class InvoiceParamsWithTemplate extends InvoiceParams {
    public templateID: number;
    public amount?: number;
    public currency?: string;
    public metadata?: object;

    constructor() {
        super();
        this.invoiceParamsType = 'InvoiceParamsWithTemplate';
    }
}
