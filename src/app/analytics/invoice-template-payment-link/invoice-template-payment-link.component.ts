import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { InvoiceTemplatePaymentLinkService } from './invoice-template-payment-link.service';
import { InvoiceTemplateFormService } from '../invoice-template-form/invoice-template-form.service';
import { CheckoutConfigFormService } from '../checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from '../payment-link/payment-link.service';
import { PaymentLinkInvoiceTemplate } from '../payment-link/payment-link-invoice-template';

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [ InvoiceTemplateService, PaymentLinkService ],
    styles: [`.form-control {height: 30px;}`]
})
export class InvoiceTemplatePaymentLinkComponent implements OnInit {

    @Input()
    public shopID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public invoiceTemplateForm: FormGroup;
    public paymentLink: string;
    public isCreated: boolean;
    public invoiceTemplateID: string;
    public invoiceTemplateAccessToken: string;

    constructor(
        private invoiceTemplateService: InvoiceTemplateService,
        private invoiceTemplateFormService: InvoiceTemplateFormService,
        private checkoutConfigFormService: CheckoutConfigFormService,
        private paymentLinkService: PaymentLinkService
    ) {}

    public ngOnInit() {
        this.invoiceTemplateForm = this.invoiceTemplateFormService.form;
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.checkoutConfigForm.valueChanges.subscribe(() => {
            this.generatePaymentLink();
        });
    }

    public resetForms() {
        this.isCreated = false;
        this.checkoutConfigForm.reset();
        this.invoiceTemplateForm.reset();
        this.invoiceTemplateForm.enable();
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }

    public createInvoiceTemplate() {
        const params = InvoiceTemplatePaymentLinkService.toInvoiceTemplateParams(this.invoiceTemplateForm.value, this.shopID);
        this.invoiceTemplateService.createInvoiceTemplate(params).subscribe((response) => {
            this.isCreated = true;
            this.invoiceTemplateForm.disable();
            this.invoiceTemplateID = response.invoiceTemplate.id;
            this.invoiceTemplateAccessToken = response.invoiceTemplateAccessToken.payload;
            this.generatePaymentLink();
        });
    }

    private generatePaymentLink() {
        const accessData = new PaymentLinkInvoiceTemplate(this.invoiceTemplateID, this.invoiceTemplateAccessToken);
        this.paymentLink = this.paymentLinkService.getPaymentLink(this.checkoutConfigForm.value, accessData, this.shopID);
    }
}
