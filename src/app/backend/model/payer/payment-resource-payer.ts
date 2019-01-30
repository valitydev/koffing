import { Payer } from './payer';
import { PaymentToolDetails } from '../payment-tool-details';
import { ClientInfo } from '../client-info';
import { ContactInfo } from '../contact-info';

export class PaymentResourcePayer extends Payer {
    public paymentToolToken: string;
    public paymentSession: string;
    public paymentToolDetails: PaymentToolDetails;
    public clientInfo: ClientInfo;
    public contactInfo: ContactInfo;

    constructor() {
        super();
        this.payerType = 'PaymentResourcePayer';
    }
}
