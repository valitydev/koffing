import { Component, Input } from '@angular/core';

import { Payment } from 'koffing/backend/model/payment';

@Component({
    selector: 'kof-payment-info',
    templateUrl: './payment-info.component.pug'
})
export class PaymentInfoComponent {

    @Input()
    public payment: Payment;

    public getLabelClass(status: string) {
        return {
            'label-success': status === 'captured',
            'label-danger': status === 'failed'
        };
    }
}
