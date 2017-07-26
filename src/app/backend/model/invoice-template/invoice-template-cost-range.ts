import { InvoiceTemplateCost } from './invoice-template-cost';
import { CostAmountRange } from './cost-amount-range';

export class InvoiceTemplateCostRange extends InvoiceTemplateCost {
    public range: CostAmountRange;
    public currency: string;

    constructor(range: CostAmountRange) {
        super();
        this.invoiceTemplateCostType = 'InvoiceTemplateCostRange';
        this.range = range;
        this.currency = 'RUB';
    }
}
