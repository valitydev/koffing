import { Injectable } from '@angular/core';
import { chain } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from 'koffing/backend/config.service';
import { PaymentLinkArguments } from './payment-link-arguments';
import { UrlShortenerService } from 'koffing/backend/url-shortener.service';
import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { InvoiceTemplateAndToken } from 'koffing/backend';
import * as moment from 'moment';

@Injectable()
export class PaymentLinkService {

    constructor(private configService: ConfigService,
                private urlShortenerService: UrlShortenerService,
                private invoiceService: InvoiceService) {
    }

    public getInvoicePaymentLink(invoice: Invoice, formValue: any): Observable<string> {
        return this.createInvoiceAccessToken(invoice.id)
            .map((accessToken) => this.prepareInvoiceUrl(formValue, invoice, accessToken))
            .switchMap((url) => this.urlShortenerService.shorten(url, invoice.dueDate))
            .map((response) => response.shortenedUrl);
    }

    public getInvoiceTemplatePaymentLink(templateAndToken: InvoiceTemplateAndToken, formValue: any): Observable<string> {
        this.prepareExpiresAtDateForTemplate(templateAndToken);
        return this.urlShortenerService
            .shorten(this.prepareInvoiceTemplateUrl(formValue, templateAndToken), this.prepareExpiresAtDateForTemplate(templateAndToken))
            .map((response) => response.shortenedUrl);
    }

    private prepareExpiresAtDateForTemplate(templateAndToken: InvoiceTemplateAndToken): any {
        const lifetimeDuration = moment.duration(templateAndToken.invoiceTemplate.lifetime);
        return moment(new Date()).add(lifetimeDuration).utc().format();
    }

    private prepareInvoiceUrl(formValue: any, invoice: Invoice, accessToken: string): string {
        const args = this.toInvoicePaymentLinkArgs(formValue, invoice.id, accessToken);
        return this.argsToUrl(args);
    }

    private prepareInvoiceTemplateUrl(formValue: any, templateAndToken: InvoiceTemplateAndToken) {
        const shopID = templateAndToken.invoiceTemplate.shopID;
        const templateID = templateAndToken.invoiceTemplate.id;
        const accessToken = templateAndToken.invoiceTemplateAccessToken.payload;
        const args = this.toInvoiceTemplatePaymentLinkArgs(formValue, templateID, accessToken);
        return this.argsToUrl(args);
    }

    private argsToUrl(paymentLinkArgs: PaymentLinkArguments): string {
        const args = chain(paymentLinkArgs)
            .map((value: any, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        return `${this.configService.checkoutUrl}/v1/checkout.html?${args}`;
    }

    private toInvoiceTemplatePaymentLinkArgs(formValue: any, templateID: string, accessToken: string): PaymentLinkArguments {
        const args = new PaymentLinkArguments();
        args.invoiceTemplateID = templateID;
        args.invoiceTemplateAccessToken = accessToken;
        const commonArgs = this.toPaymentLinkArgs(formValue);
        return Object.assign(commonArgs, args);
    }

    private toInvoicePaymentLinkArgs(formValue: any, invoiceID: string, accessToken: string): PaymentLinkArguments {
        const args = new PaymentLinkArguments();
        args.invoiceID = invoiceID;
        args.invoiceAccessToken = accessToken;
        const commonArgs = this.toPaymentLinkArgs(formValue);
        return Object.assign(commonArgs, args);
    }

    private toPaymentLinkArgs(formValue: any): PaymentLinkArguments {
        const args = new PaymentLinkArguments();
        args.name = formValue.name || '';
        args.description = formValue.description || '';
        args.email = formValue.email || '';
        args.redirectUrl = formValue.redirectUrl || '';
        if (formValue.paymentFlowHold) {
            args.paymentFlowHold = formValue.paymentFlowHold;
            args.holdExpiration = formValue.holdExpiration;
        }
        args.terminals = formValue.terminals;
        args.wallets = formValue.wallets;
        args.bankCard = formValue.bankCard;
        args.applePay = formValue.applePay;
        args.googlePay = formValue.googlePay;
        args.samsungPay = formValue.samsungPay;
        return args;
    }

    private createInvoiceAccessToken(invoiceID: string): Observable<string> {
        return this.invoiceService.createInvoiceAccessToken(invoiceID).map((response) => response.payload);
    }
}
