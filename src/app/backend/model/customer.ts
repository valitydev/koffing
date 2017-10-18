import { ContactInfo } from 'koffing/backend/model/contact-info';

export class Customer {
    public id: string;
    public shopID: string;
    public contactInfo: ContactInfo;
    public status: string;
    public metadata: object;
}
