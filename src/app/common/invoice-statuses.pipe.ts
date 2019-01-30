import { Pipe, PipeTransform } from '@angular/core';

import { INVOICE_STATUS_LABEL } from 'koffing/invoices/invoice-status-label';

@Pipe({
    name: 'kofInvoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {
    public transform(input: string): string {
        const status = INVOICE_STATUS_LABEL[input];
        return status ? status : input;
    }
}
