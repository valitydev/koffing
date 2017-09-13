import { Component, Input } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';

@Component({
    selector: 'kof-invoice-details',
    templateUrl: 'invoice-details.component.pug'
})
export class InvoiceDetailsComponent {

    @Input()
    public invoice: Invoice;

    public getLabelClass(status: string) {
        return {
            'label-success': status === 'paid',
            'label-danger': status === 'cancelled',
            'label-warning': status === 'unpaid'
        };
    }
}
