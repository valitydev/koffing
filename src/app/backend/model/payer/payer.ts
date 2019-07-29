import { PaymentToolDetails } from 'koffing/backend';

export abstract class Payer {
    public payerType: string;
    public paymentToolDetails: PaymentToolDetails;
}
