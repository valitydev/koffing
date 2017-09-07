import { Injectable } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/config.service';
import { PaymentLinkArguments } from './payment-link-arguments';
import { PaymentLinkInvoice } from './payment-link-invoice';
import { PaymentLinkInvoiceTemplate } from './payment-link-invoice-template';
import { UrlShortenerService } from 'koffing/backend/url-shortener.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentLinkService {

    constructor(private configService: ConfigService,
                private urlShortenerService: UrlShortenerService) {
    }

    public getPaymentLink(formValue: any, accessData: PaymentLinkInvoice | PaymentLinkInvoiceTemplate, shopID: string): Observable<string> {
        const paymentLinkArguments = this.toPaymentLinkArguments(formValue, accessData, shopID);
        const args = chain(paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        const checkoutUrl = `${this.configService.checkoutUrl}/html/payframe.html?${args}`;
        return this.urlShortenerService.shorten(checkoutUrl)
            .map((response) => `${this.configService.shortenUrlEndpoint}/${response.sid}`);
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
        if (formValue.paymentFlowHold) {
            args.paymentFlowHold = formValue.paymentFlowHold;
            args.holdExpiration = formValue.holdExpiration;
        }
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
