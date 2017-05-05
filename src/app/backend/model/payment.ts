import { LogicError } from 'koffing/backend/model/logic-error';
import { ContactInfo } from 'koffing/backend/model/contact-info';

export class Payment {
    public id: string;
    public status: string;
    public error: LogicError;
    public invoiceID: string;
    public createdAt: string;
    public paymentToolToken: string;
    public paymentSession: string;
    public contactInfo: ContactInfo;
    public amount: number;
    public currency: string;
    public fingerprint: string;
    public payerIP: string;
}
