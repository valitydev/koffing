import { Component, Input } from '@angular/core';
import { Invoice } from 'koffing/backend';

@Component({
    selector: 'kof-invoice-line-details',
    templateUrl: 'invoice-cart-details.component.pug'
})
export class InvoiceCartDetailsComponent {
    @Input()
    public invoice: Invoice;
}
