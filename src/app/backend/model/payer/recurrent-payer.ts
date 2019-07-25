import { Payer } from './payer';
import { ContactInfo, PaymentToolDetailsBankCard } from 'koffing/backend';
import { PaymentRecurrentParent } from 'koffing/backend/model/payer/payment-recurrent-parent';

export class RecurrentPayer extends Payer {
    public contactInfo: ContactInfo;
    public recurrentParentPayment: PaymentRecurrentParent;
    public paymentToolDetails: PaymentToolDetailsBankCard;

    constructor() {
        super();
        this.payerType = 'RecurrentPayer';
    }
}
