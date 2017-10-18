import { Component, Input, OnChanges } from '@angular/core';

import { Payment } from 'koffing/backend/model/payment/payment';
import { PAYMENT_STATUS } from 'koffing/backend';
import { CustomerService } from 'koffing/backend/customer.service';
import { Customer } from 'koffing/backend/model/customer';
import { CustomerPayer } from 'koffing/backend/model/payer/customer-payer';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug'
})
export class PaymentDetailsComponent implements OnChanges {

    @Input()
    public payment: Payment;

    public customer: Customer;

    constructor(private customerService: CustomerService) {}

    public ngOnChanges() {
        if (this.payment && this.payment.payer.payerType === 'CustomerPayer') {
            const payer = this.payment.payer as CustomerPayer;
            this.customerService.getCustomerById(payer.customerID)
                .subscribe((customer) => this.customer = customer);
        }
    }

    public isFlowInformationAvailable(payment: Payment) {
        return payment.flow.type === 'PaymentFlowHold' && this.payment.status === PAYMENT_STATUS.processed;
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === PAYMENT_STATUS.captured,
            'label-danger': status === PAYMENT_STATUS.failed
        };
    }
}
