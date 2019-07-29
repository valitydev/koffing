import { Payer } from './payer';
import { ClientInfo } from '../client-info';
import { ContactInfo } from '../contact-info';

export class PaymentResourcePayer extends Payer {
    public paymentToolToken: string;
    public paymentSession: string;
    public clientInfo: ClientInfo;
    public contactInfo: ContactInfo;

    constructor() {
        super();
        this.payerType = 'PaymentResourcePayer';
    }
}
