import { InvoiceChange } from './invoice-change';
import { Invoice } from '../invoice';

export class InvoiceCreated extends InvoiceChange {
    public invoice: Invoice;
    
    constructor() {
        super();
        this.changeType = 'InvoiceCreated';
    }
}
