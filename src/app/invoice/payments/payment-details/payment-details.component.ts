import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug'
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
        if (this.payment.payer.payerType === 'CustomerPayer') {
            this.customerPayer = this.payment.payer as CustomerPayer;
            this.customerService
                .getCustomerById(this.customerPayer.customerID)
                .subscribe(customer => (this.customer = customer));
        }
        if (this.payment.payer.payerType === 'RecurrentPayer') {
            this.recurrentPayer = this.payment.payer as RecurrentPayer;
        }
        if (this.payment.payer.payerType === 'PaymentResourcePayer') {
            this.paymentResourcePayer = this.payment.payer as PaymentResourcePayer;
        }
    }

    public initPaymentTool() {
        if (this.payment.payer.paymentToolDetails.detailsType === 'PaymentToolDetailsBankCard') {
            this.bankCard = this.payment.payer.paymentToolDetails as PaymentToolDetailsBankCard;
        }
        if (
            this.payment.payer.paymentToolDetails.detailsType === 'PaymentToolDetailsDigitalWallet'
        ) {
            this.digitalWallet = this.payment.payer.paymentToolDetails as DigitalWalletDetailsQIWI;
        }
        if (
            this.payment.payer.paymentToolDetails.detailsType ===
            'PaymentToolDetailsPaymentTerminal'
        ) {
            this.terminal = this.payment.payer
                .paymentToolDetails as PaymentToolDetailsPaymentTerminal;
        }
    }

    public initFlow() {
        if (this.payment.flow.type === 'PaymentFlowInstant') {
            this.flowInstant = this.payment.flow as PaymentFlowInstant;
        }
        if (this.payment.flow.type === 'PaymentFlowHold') {
            this.flowHold = this.payment.flow as PaymentFlowHold;
        }
    }

    public getRecurrentParentInvoiceLink(): string {
        return (
            '/shop/' +
            this.payment.shopID +
            '/invoice/' +
            this.recurrentPayer.recurrentParentPayment.invoiceID
        );
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
