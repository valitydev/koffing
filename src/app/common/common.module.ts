import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { EventPollerService } from './event-poller.service';
import { SelectComponent } from './select/select.component';
import { LoadingComponent } from './loading/loading.component';
import { MinValueValidatorDirective } from './min-value.directive';
import { MaxValueValidatorDirective } from './max-value.directive';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { PaginateComponent } from './paginate/paginate.component';
import { PaginationPipe } from './paginate/pagination.pipe';
import { InvoiceStatusPipe } from './invoice-statuses.pipe';
import { PaymentStatusPipe } from './payment-statuses.pipe';
import { PayoutStatusPipe } from './payout-status.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent,
        DateRangeComponent,
        PaginateComponent,
        PaginationPipe,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        PayoutStatusPipe
    ],
    exports: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent,
        DateRangeComponent,
        PaginateComponent,
        PaginationPipe,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        PayoutStatusPipe
    ],
    providers: [
        EventPollerService
    ]
})
export class CommonModule { }
