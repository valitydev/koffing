import { Component, Input, OnChanges } from '@angular/core';
import { get } from 'lodash';

import { CustomerService } from 'koffing/backend/customer.service';
import {
    PAYMENT_STATUS,
    Customer,
    CustomerPayer,
    PaymentError,
    Payment
} from 'koffing/backend';
import * as errors from './errors.json';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug'
})
export class PaymentDetailsComponent implements OnChanges {

    @Input()
    public payment: Payment;

    public customer: Customer;

    constructor(private customerService: CustomerService) {
    }

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

    public getMessage(paymentError: PaymentError) {
        return this.mapErrors(paymentError, errors);
    }

    private mapErrors(error: PaymentError, dictionary: any, acc: string = ''): string {
        const {code} = error;
        const getMessage = (messageObj: any, defaultMessage: string) => get(messageObj, 'message')
            ? messageObj.message
            : defaultMessage;
        const key = dictionary ? dictionary[code] : code;
        if (error.subError) {
            const message = getMessage(key, code);
            return this.mapErrors(error.subError, key, acc.concat(acc === '' ? message : ` -> ${message}`));
        } else {
            const unkownPrefix = (dictionary && dictionary[code]) ? '' : 'Неизвестная ошибка: ';
            const result = acc === '' ? getMessage(key, code) : `${acc} -> ${key}.`;
            return unkownPrefix.concat(result);
        }
    }
}
