import { Pipe, PipeTransform } from '@angular/core';

import { invoiceStatuses } from 'koffing/analytics/invoices/invoice-statuses';

@Pipe({
    name: 'kofInvoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = invoiceStatuses[input];
        return status ? status : input;
    }
}
