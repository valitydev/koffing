import { Component, Input } from '@angular/core';
import { InvoiceLine } from 'koffing/backend/model/invoice-cart/invoice-line';

@Component({
    selector: 'kof-invoice-line-details',
    templateUrl: 'invoice-cart-details.component.pug'
})
export class InvoiceCartDetailsComponent {

    @Input()
    public cart: InvoiceLine[];

}
