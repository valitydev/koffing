import { Injectable } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceTableItem } from 'koffing/invoices/search-result/invoice-table-item';

@Injectable()
export class SearchResultService {

    public static toInvoiceTableItems(invoices: Invoice[]): InvoiceTableItem[] {
        return invoices.map((invoice) => {
            return {
                invoice,
                visible: false
            };
        });
    }
}
