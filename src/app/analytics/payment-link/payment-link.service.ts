import { Injectable } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/config.service';
import { PaymentLinkArguments } from './payment-link-arguments';
import { PaymentLinkInvoice } from './payment-link-invoice';
import { PaymentLinkInvoiceTemplate } from './payment-link-invoice-template';

@Injectable()
export class PaymentLinkService {

    constructor(private configService: ConfigService) {}

    public getPaymentLink(formValue: any, accessData: PaymentLinkInvoice | PaymentLinkInvoiceTemplate, shopID: string) {
        const paymentLinkArguments = this.toPaymentLinkArguments(formValue, accessData, shopID);
        const args = chain(paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        return `${this.configService.checkoutUrl}/html/payframe.html?${args}`;
    }

    private toPaymentLinkArguments(formValue: any, accessData: PaymentLinkInvoice | PaymentLinkInvoiceTemplate, shopID: string): PaymentLinkArguments {
        const args = new PaymentLinkArguments();
        args.name = formValue.name || '';
        args.description = formValue.description || '';
        args.payButtonLabel = formValue.payButtonLabel || '';
        args.logo = formValue.logo || '';
        args.email = formValue.email || '';
        args.redirectUrl = formValue.redirectUrl || '';
        args.popupMode = true;
        // TODO fix after real apple pay payments api capability
        if (shopID === 'TEST') {
            args.applePayTest = true;
        }
        if (accessData instanceof PaymentLinkInvoice) {
            args.invoiceID = accessData.invoiceID || '';
            args.invoiceAccessToken = accessData.invoiceAccessToken || '';
        }
        if (accessData instanceof PaymentLinkInvoiceTemplate) {
            args.invoiceTemplateID = accessData.invoiceTemplateID || '';
            args.invoiceTemplateAccessToken = accessData.invoiceTemplateAccessToken || '';
        }
        return args;
    }
}
