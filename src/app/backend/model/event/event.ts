import { InvoiceChange } from './invoice-change';

export class Event {
    public id: number;
    public createdAt: string;
    public changes: InvoiceChange[];
}
