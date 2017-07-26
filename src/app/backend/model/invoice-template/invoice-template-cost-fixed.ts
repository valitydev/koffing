import { InvoiceTemplateCost } from './invoice-template-cost';

export class InvoiceTemplateCostFixed extends InvoiceTemplateCost {
    public amount: number;
    public currency: string;

    constructor(amount: number) {
        super();
        this.invoiceTemplateCostType = 'InvoiceTemplateCostFixed';
        this.amount = amount;
        this.currency = 'RUB';
    }
}
