import { LogicError } from '../logic-error';
import { ContactInfo } from '../contact-info';
import { PaymentFlow } from './payment-flow';

export class Payment {
    public id: string;
    public invoiceID: string;
    public createdAt: string;
    public amount: number;
    public currency: string;
    public contactInfo: ContactInfo;
    public paymentSession: string;
    public paymentToolToken: string;
    public fee: number;
    public fingerprint: string;
    public payerIP: string;
    public status: string;
    public error: LogicError;
    public flow: PaymentFlow;
}
