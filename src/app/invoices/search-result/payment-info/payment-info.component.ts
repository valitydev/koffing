import { Component, Input, OnInit } from '@angular/core';

import { PAYMENT_STATUS } from 'koffing/backend';
import { Payment } from 'koffing/backend/model/payment';

@Component({
    selector: 'kof-payment-info',
    templateUrl: './payment-info.component.pug'
})
export class PaymentInfoComponent implements OnInit {

    @Input()
    public invoiceID: string;

    @Input()
    public payment: Payment;

    public inProgressPolling: boolean;
    public inStatusProcessed: boolean;

    public ngOnInit() {
        this.inStatusProcessed = (this.payment.status === PAYMENT_STATUS.processed);
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === PAYMENT_STATUS.captured,
            'label-danger': status === PAYMENT_STATUS.failed
        };
    }

    public changeStatus(status: string) {
        this.payment.status = status;
        this.inProgressPolling = false;
        this.inStatusProcessed = false;
    }

    public changeProgressPolling(value: boolean) {
        this.inProgressPolling = value;
    }
}
