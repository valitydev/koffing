import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PaginateComponent } from './invoices/paginate/paginate.component';
import { SearchFormComponent } from './invoices/search-form/search-form.component';
import { SearchResultComponent } from './invoices/search-result/search-result.component';
import { PaginationPipe } from './invoices/paginate/pagination.pipe';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { CommonModule } from 'koffing/common/common.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BackendModule } from 'koffing/backend/backend.module';
import { AnalyticsComponent } from 'koffing/analytics/analytics.component';
import { DateRangeSelectorComponent } from 'koffing/analytics/dashboard/date-range-selector/date-range-selector.component';
import { LineChartComponent } from 'koffing/analytics/dashboard/line-chart/line-chart.component';
import { DoughnutChartComponent } from 'koffing/analytics/dashboard/doughnut-chart/doughnut-chart.component';
import { StatisticPanelComponent } from 'koffing/analytics/statistic-panel/statistic-panel.component';
import { InvoiceStatusPipe } from 'koffing/analytics/invoices/invoice-statuses.pipe';
import { SearchDetailsComponent } from 'koffing/analytics/invoices/search-result/search-details/search-details.component';
import { PaymentInfoComponent } from 'koffing/analytics/invoices/search-result/payment-info/payment-info.component';
import { PaymentStatusPipe } from 'koffing/analytics/invoices/payment-statuses.pipe';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        CalendarModule,
        BackendModule
    ],
    declarations: [
        DateRangeSelectorComponent,
        AnalyticsComponent,
        DashboardComponent,
        InvoicesComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        BaseChartDirective,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent,
        SearchDetailsComponent,
        PaymentInfoComponent
    ]
})
export class AnalyticsModule { }
