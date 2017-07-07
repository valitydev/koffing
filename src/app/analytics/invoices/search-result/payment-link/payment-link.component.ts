import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/config.service';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { PaymentLinkArguments } from './payment-link-arguments';

@Component({
    selector: 'kof-payment-link',
    templateUrl: './payment-link.component.pug',
    styles: [`input.form-control { height: 30px }`]
})
export class PaymentLinkComponent implements OnInit {

    @Input()
    public invoiceID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public paymentLinkArguments: PaymentLinkArguments;
    public paymentLink: string;
    public isLoading: boolean;

    constructor(
        private configService: ConfigService,
        private invoiceService: InvoiceService
    ) {}

    public ngOnInit() {
        this.paymentLinkArguments = new PaymentLinkArguments();
        this.isLoading = true;
        this.invoiceService.createInvoiceAccessToken(this.invoiceID).subscribe((response) => {
            this.paymentLinkArguments.invoiceID = this.invoiceID;
            this.paymentLinkArguments.popupMode = true;
            this.paymentLinkArguments.invoiceAccessToken = response.payload;
            this.createPaymentLink();
            this.isLoading = false;
        });
    }

    public createPaymentLink() {
        const paymentLinkArguments = chain(this.paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        this.paymentLink = `${this.configService.checkoutUrl}/html/payframe.html?${paymentLinkArguments}`;
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }
}
