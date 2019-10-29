import { Component, Input, OnChanges } from '@angular/core';
import { get } from 'lodash';

import { CustomerService } from 'koffing/backend/customer.service';
import {
    Customer,
    CustomerPayer,
    Payment,
    PAYMENT_STATUS,
    PaymentError,
    PaymentFlowHold,
    PaymentFlowInstant,
    PaymentResourcePayer,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsPaymentTerminal,
    RecurrentPayer
} from 'koffing/backend';
import * as errors from './errors.json';
import { DigitalWalletDetailsQIWI } from 'koffing/backend/model/payment-tool-details/digital-wallet-details-qiwi';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug',
    styleUrls: ['payment-details.component.less']
})
export class PaymentDetailsComponent implements OnChanges {
    @Input()
    public payment: Payment;

    public customer: Customer;
    public paymentResourcePayer: PaymentResourcePayer;
    public customerPayer: CustomerPayer;
    public recurrentPayer: RecurrentPayer;

    public bankCard: PaymentToolDetailsBankCard;
    public digitalWallet: DigitalWalletDetailsQIWI;
    public terminal: PaymentToolDetailsPaymentTerminal;

    public flowInstant: PaymentFlowInstant;
    public flowHold: PaymentFlowHold;

    constructor(private customerService: CustomerService) {}

    public ngOnChanges() {
        if (this.payment) {
            this.initPayer();
            this.initPaymentTool();
            this.initFlow();
        }
    }

    public initPayer() {
        switch (this.payment.payer.payerType) {
            case 'CustomerPayer':
                this.customerPayer = this.payment.payer as CustomerPayer;
                this.customerService
                    .getCustomerById(this.customerPayer.customerID)
                    .subscribe(customer => (this.customer = customer));
                break;
            case 'RecurrentPayer':
                this.recurrentPayer = this.payment.payer as RecurrentPayer;
                break;
            case 'PaymentResourcePayer':
                this.paymentResourcePayer = this.payment.payer as PaymentResourcePayer;
                break;
        }
    }

    public initPaymentTool() {
        switch (this.payment.payer.paymentToolDetails.detailsType) {
            case 'PaymentToolDetailsBankCard':
                this.bankCard = this.payment.payer.paymentToolDetails as PaymentToolDetailsBankCard;
                break;
            case 'PaymentToolDetailsDigitalWallet':
                this.digitalWallet = this.payment.payer
                    .paymentToolDetails as DigitalWalletDetailsQIWI;
                break;
            case 'PaymentToolDetailsPaymentTerminal':
                this.terminal = this.payment.payer
                    .paymentToolDetails as PaymentToolDetailsPaymentTerminal;
                break;
        }
    }

    public initFlow() {
        switch (this.payment.flow.type) {
            case 'PaymentFlowInstant':
                this.flowInstant = this.payment.flow as PaymentFlowInstant;
                break;
            case 'PaymentFlowHold':
                this.flowInstant = this.payment.flow as PaymentFlowHold;
                break;
        }
    }

    public getRecurrentParentInvoiceLink(): string {
        return `/shop/${this.payment.shopID}/invoice/${
            this.recurrentPayer.recurrentParentPayment.invoiceID
        }`;
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
        const { code } = error;
        const getMessage = (messageObj: any, defaultMessage: string) =>
            get(messageObj, 'message') ? messageObj.message : defaultMessage;
        const key = dictionary ? dictionary[code] : code;
        if (error.subError) {
            const message = getMessage(key, code);
            return this.mapErrors(
                error.subError,
                key,
                acc.concat(acc === '' ? message : ` -> ${message}`)
            );
        } else {
            const unkownPrefix = dictionary && dictionary[code] ? '' : 'Неизвестная ошибка: ';
            const result = acc === '' ? getMessage(key, code) : `${acc} -> ${key}.`;
            return unkownPrefix.concat(result);
        }
    }
}
