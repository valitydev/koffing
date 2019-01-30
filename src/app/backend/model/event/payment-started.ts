import { InvoiceChange } from './invoice-change';
import { Payment } from '../payment/payment';

export class PaymentStarted extends InvoiceChange {
    public payment: Payment;

    constructor() {
        super();
        this.changeType = 'PaymentStarted';
    }
}
