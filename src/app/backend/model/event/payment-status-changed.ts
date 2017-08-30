import { InvoiceChange } from './invoice-change';
import { LogicError } from '../logic-error';

export class PaymentStatusChanged extends InvoiceChange {
    public status: string;
    public paymentID: string;
    public error: LogicError;

    constructor(status: string, paymentID: string, error?: LogicError) {
        super();
        this.changeType = 'PaymentStatusChanged';
        this.status = status;
        this.paymentID = paymentID;
        this.error = error;
    }
}
