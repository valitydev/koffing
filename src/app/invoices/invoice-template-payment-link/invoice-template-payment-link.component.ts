import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { COST_TYPE } from 'koffing/backend/constants/invoice-template-cost-type';
import { HOLD_EXPIRATION } from 'koffing/backend/constants/hold-expiration';
import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { InvoiceTemplatePaymentLinkService } from './invoice-template-payment-link.service';
import { InvoiceTemplateFormService } from '../invoice-template-form/invoice-template-form.service';
import { PaymentLinkService } from 'koffing/checkout/payment-link/payment-link.service';
import { InvoiceTemplateAndToken } from 'koffing/backend';
import { CheckoutConfigFormService } from 'koffing/checkout/checkout-config-form/checkout-config-form.service';

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [
        InvoiceTemplateService
    ],
    styles: [`.form-control { height: 30px; }`]
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
    public paymentLinkVisible: boolean = false;

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

    public resetForms() {
        this.isCreated = false;
        this.invoiceTemplateForm.enable();
        this.invoiceTemplateForm.reset();
        this.invoiceTemplateForm.patchValue({
            selectedCostType: COST_TYPE.unlim
        });
        this.checkoutConfigForm.reset();
        this.checkoutConfigForm.patchValue({
            paymentFlowHold: false,
            holdExpiration: HOLD_EXPIRATION.cancel
        });
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
            this.invoiceTemplateAndToken = response;
            this.generatePaymentLink();
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
