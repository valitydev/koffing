import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PaymentMethod, InvoiceTemplateAndToken } from 'koffing/backend';
import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { PaymentLinkService } from 'koffing/checkout/payment-link/payment-link.service';
import { CheckoutConfigFormService } from 'koffing/checkout/checkout-config-form/checkout-config-form.service';
import { InvoiceTemplateFormService } from '../invoice-template-form/invoice-template-form.service';
import { InvoiceTemplatePaymentLinkService } from './invoice-template-payment-link.service';
import { PAYMENT_LINK_CREATION_STEP } from './invoice-template-payment-link-step';

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [InvoiceTemplateService]
})
export class InvoiceTemplatePaymentLinkComponent implements OnInit {

    @Input()
    public shopID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public invoiceTemplateForm: FormGroup;
    public paymentLink: string;
    public paymentLinkVisible: boolean = false;
    public methods: PaymentMethod[];
    public step = PAYMENT_LINK_CREATION_STEP;
    public currentStep = PAYMENT_LINK_CREATION_STEP.template;

    private invoiceTemplateAndToken: InvoiceTemplateAndToken;

    constructor(private invoiceTemplateService: InvoiceTemplateService,
                private invoiceTemplateFormService: InvoiceTemplateFormService,
                private checkoutConfigFormService: CheckoutConfigFormService,
                private paymentLinkService: PaymentLinkService) {
    }

    public ngOnInit() {
        this.invoiceTemplateForm = this.invoiceTemplateFormService.form;
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.checkoutConfigForm.valueChanges.subscribe(() => {
            this.paymentLinkVisible = false;
        });
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }

    public createInvoiceTemplate() {
        const params = InvoiceTemplatePaymentLinkService.toInvoiceTemplateParams(this.invoiceTemplateForm.value, this.shopID);
        this.invoiceTemplateService.createInvoiceTemplate(params).subscribe((response) => {
            this.invoiceTemplateAndToken = response;
            this.invoiceTemplateService.getInvoiceTemplatePaymentMethods(response.invoiceTemplate.id).subscribe((methods) => this.methods = methods);
            this.currentStep = this.currentStep + 1;
        });
    }

    public generatePaymentLink() {
        this.paymentLinkService.getInvoiceTemplatePaymentLink(this.invoiceTemplateAndToken, this.checkoutConfigForm.value)
            .subscribe((paymentLink) => {
                this.paymentLink = paymentLink;
                this.paymentLinkVisible = true;
            });
    }
}
