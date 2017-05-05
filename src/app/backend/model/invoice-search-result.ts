import { Invoice } from 'koffing/backend/model/invoice';

export class InvoiceSearchResult {
    public totalCount: number;
    public result: Invoice[];
}
