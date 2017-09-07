import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InvoiceService } from 'koffing/backend/invoice.service';
import { CheckoutConfigFormService } from '../checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from '../payment-link/payment-link.service';
import { PaymentLinkInvoice } from '../payment-link/payment-link-invoice';

@Component({
    selector: 'kof-invoice-payment-link',
    templateUrl: 'invoice-payment-link.component.pug',
    styles: [`.form-control {height: 30px;}`]
})
export class InvoicePaymentLinkComponent implements OnInit {

    @Input()
    public invoiceID: string;

    @Input()
    public shopID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public paymentLink: string;
    public invoiceAccessToken: string;
    public paymentLinkVisible: boolean = false;

    constructor(private invoiceService: InvoiceService,
                private checkoutConfigFormService: CheckoutConfigFormService,
                private paymentLinkService: PaymentLinkService) {
    }

    public ngOnInit() {
        this.createInvoiceAccessToken();
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.checkoutConfigForm.valueChanges.subscribe(() => {
            this.paymentLinkVisible = false;
        });
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }

    public generatePaymentLink() {
        const accessData = new PaymentLinkInvoice(this.invoiceID, this.invoiceAccessToken);
        this.paymentLinkService.getPaymentLink(this.checkoutConfigForm.value, accessData, this.shopID).subscribe((paymentLink) => {
            this.paymentLink = paymentLink;
            this.paymentLinkVisible = true;
        });
    }

    private createInvoiceAccessToken() {
        this.invoiceService.createInvoiceAccessToken(this.invoiceID).subscribe((response) => {
            this.invoiceAccessToken = response.payload;
        });
    }
}
