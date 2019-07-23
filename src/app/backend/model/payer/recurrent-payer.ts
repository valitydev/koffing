import { Payer } from './payer';
import { ContactInfo } from 'koffing/backend';
import { PaymentRecurrentParent } from 'koffing/backend/model/payer/payment-recurrent-parent';

export class RecurrentPayer extends Payer {
    public contactInfo: ContactInfo;
    public paymentRecurrentParent: PaymentRecurrentParent;

    constructor() {
        super();
        this.payerType = 'RecurrentPayer';
    }
}
