import { InvoiceParams } from './invoice-params';

export class InvoiceParamsAll extends InvoiceParams {
    public shopID: string;
    public amount: number;
    public currency: string;
    public metadata: object;
    public dueDate: string;
    public product: string;
    public description?: string;

    constructor() {
        super();
        this.invoiceParamsType = 'InvoiceParamsAll';
    }
}
