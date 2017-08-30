import { InvoiceChange } from './invoice-change';

export class PaymentInteractionRequested extends InvoiceChange {
    public paymentID: string;
    public userInteraction: any;

    constructor(paymentID: string, userInteraction: any) {
        super();
        this.changeType = 'PaymentInteractionRequested';
        this.paymentID = paymentID;
        this.userInteraction = userInteraction;
    }
}
