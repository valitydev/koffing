import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { CheckoutModule } from 'koffing/checkout/checkout.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceCartDetailsComponent } from './invoice-cart-details/invoice-cart-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { InvoicePaymentLinkComponent } from './invoice-payment-link/invoice-payment-link.component';
import { HoldExpirationPipe } from './payments/payment-details/hold-expiration.pipe';
import { PaymentCancelComponent } from './payments/payment-cancel/payment-cancel.component';
import { PaymentCaptureComponent } from './payments/payment-capture/payment-capture.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule,
        CheckoutModule
    ],
    declarations: [
        InvoiceComponent,
        InvoiceDetailsComponent,
        InvoiceCartDetailsComponent,
        PaymentsComponent,
        PaymentDetailsComponent,
        InvoicePaymentLinkComponent,
        HoldExpirationPipe,
        PaymentCancelComponent,
        PaymentCaptureComponent
    ]
})
export class InvoiceModule { }
