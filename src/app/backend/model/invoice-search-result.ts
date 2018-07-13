import { Invoice } from './invoice';

export class InvoiceSearchResult {
    public continuationToken: string;
    public result: Invoice[];
}
