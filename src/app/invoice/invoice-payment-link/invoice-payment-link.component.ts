import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Invoice } from 'koffing/backend/model/invoice';
import { CheckoutConfigFormService } from 'koffing/checkout/checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from 'koffing/checkout/payment-link/payment-link.service';

@Component({
    selector: 'kof-invoice-payment-link',
    templateUrl: 'invoice-payment-link.component.pug',
    styles: [`.form-control {height: 30px;}`]
})
export class InvoicePaymentLinkComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public paymentLink: string;
    public paymentLinkVisible: boolean = false;

    constructor(
        private checkoutConfigFormService: CheckoutConfigFormService,
        private paymentLinkService: PaymentLinkService) {
    }

    public ngOnInit() {
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
        this.paymentLinkService.getInvoicePaymentLink(this.invoice, this.checkoutConfigForm.value).subscribe((paymentLink) => {
            this.paymentLink = paymentLink;
            this.paymentLinkVisible = true;
        });
    }
}
