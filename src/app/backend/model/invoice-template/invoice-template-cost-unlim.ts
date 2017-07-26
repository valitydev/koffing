import { InvoiceTemplateCost } from './invoice-template-cost';

export class InvoiceTemplateCostUnlim extends InvoiceTemplateCost {
    constructor() {
        super();
        this.invoiceTemplateCostType = 'InvoiceTemplateCostUnlim';
    }
}
