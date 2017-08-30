import { InvoiceChange } from './invoice-change';

export class InvoiceStatusChanged extends InvoiceChange {
    public status: string;
    public reason: string;

    constructor(status: string, reason?: string) {
        super();
        this.changeType = 'InvoiceStatusChanged';
        this.status = status;
        this.reason = reason;
    }
}
