import { Component, Input } from '@angular/core';
import { PaymentRefund } from 'koffing/backend';

@Component({
    selector: 'kof-refund-details',
    templateUrl: 'payment-refund-details.component.pug'
})
export class PaymentRefundDetailsComponent {
    @Input()
    public refund: PaymentRefund;
}
