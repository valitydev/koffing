import { Payer } from './payer';
import { PaymentToolDetailsBankCard } from 'koffing/backend';

export class CustomerPayer extends Payer {
    public customerID: string;
    public paymentToolDetails: PaymentToolDetailsBankCard;

    constructor() {
        super();
        this.payerType = 'CustomerPayer';
    }
}
