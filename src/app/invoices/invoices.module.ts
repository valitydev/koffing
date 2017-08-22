import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { CalendarModule } from 'primeng/primeng';
import { BackendModule } from 'koffing/backend/backend.module';
import { InvoicesComponent } from 'koffing/invoices/invoices.component';
import { PaginateComponent } from 'koffing/invoices/paginate/paginate.component';
import { SearchFormComponent } from 'koffing/invoices/search-form/search-form.component';
import { SearchResultComponent } from 'koffing/invoices/search-result/search-result.component';
import { InvoiceStatusPipe } from 'koffing/invoices/invoice-statuses.pipe';
import { PaymentStatusPipe } from 'koffing/invoices/payment-statuses.pipe';
import { PaginationPipe } from 'koffing/invoices/paginate/pagination.pipe';
import { SearchDetailsComponent } from 'koffing/invoices/search-result/search-details/search-details.component';
import { CreateInvoiceComponent } from 'koffing/invoices/create-invoice/create-invoice.component';
import { InvoicePaymentLinkComponent } from 'koffing/invoices/invoice-payment-link/invoice-payment-link.component';
import { InvoiceTemplatePaymentLinkComponent } from 'koffing/invoices/invoice-template-payment-link/invoice-template-payment-link.component';
import { CheckoutConfigFormComponent } from 'koffing/invoices/checkout-config-form/checkout-config-form.component';
import { InvoiceFormComponent } from 'koffing/invoices/invoice-form/invoice-form.component';
import { InvoiceTemplateFormComponent } from 'koffing/invoices/invoice-template-form/invoice-template-form.component';
import { PaymentInfoComponent } from 'koffing/invoices/search-result/payment-info/payment-info.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CalendarModule,
        BackendModule
    ],
    declarations: [
        InvoicesComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        PaginationPipe,
        SearchDetailsComponent,
        CreateInvoiceComponent,
        InvoicePaymentLinkComponent,
        InvoiceTemplatePaymentLinkComponent,
        CheckoutConfigFormComponent,
        InvoiceFormComponent,
        InvoiceTemplateFormComponent,
        PaymentInfoComponent
    ]
})
export class InvoicesModule { }
