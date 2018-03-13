import { InvoiceChange } from './invoice-change';
import { LogicError } from '../logic-error';

export class RefundStatusChanged extends InvoiceChange {
    public status: string;
    public paymentID: string;
    public refundID: string;
    public error: LogicError;

    constructor(status: string, paymentID: string, refundID: string, error?: LogicError) {
        super();
        this.changeType = 'RefundStatusChanged';
        this.status = status;
        this.paymentID = paymentID;
        this.refundID = refundID;
        this.error = error;
    }
}
