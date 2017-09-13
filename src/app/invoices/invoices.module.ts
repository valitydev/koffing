import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from 'primeng/primeng';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { CheckoutModule } from 'koffing/checkout/checkout.module';
import { InvoicesComponent } from './invoices.component';
import { PaginateComponent } from './paginate/paginate.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PaginationPipe } from './paginate/pagination.pipe';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceTemplatePaymentLinkComponent } from './invoice-template-payment-link/invoice-template-payment-link.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceTemplateFormComponent } from './invoice-template-form/invoice-template-form.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        CalendarModule,
        BackendModule,
        CheckoutModule
    ],
    declarations: [
        InvoicesComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        PaginationPipe,
        CreateInvoiceComponent,
        InvoiceTemplatePaymentLinkComponent,
        InvoiceFormComponent,
        InvoiceTemplateFormComponent
    ]
})
export class InvoicesModule { }
