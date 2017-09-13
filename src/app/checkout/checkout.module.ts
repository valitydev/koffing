import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BackendModule } from 'koffing/backend/backend.module';
import { CheckoutConfigFormService } from './checkout-config-form/checkout-config-form.service';
import { CheckoutConfigFormComponent } from './checkout-config-form/checkout-config-form.component';
import { PaymentLinkService } from './payment-link/payment-link.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BackendModule
    ],
    declarations: [
        CheckoutConfigFormComponent
    ],
    providers: [
        CheckoutConfigFormService,
        PaymentLinkService
    ],
    exports: [
        CheckoutConfigFormComponent
    ]
})
export class CheckoutModule { }
