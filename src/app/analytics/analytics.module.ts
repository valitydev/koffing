import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';
import { PaginateComponent } from './finance/paginate/paginate.component';
import { SearchFormComponent } from './finance/search-form/search-form.component';
import { SearchResultComponent } from './finance/search-result/search-result.component';
import { PaginationPipe } from './finance/paginate/pagination.pipe';
import { PaymentStatusPipe } from './finance/search-result/payment-statuses.pipe';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { CommonModule } from 'koffing/common/common.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BackendModule } from 'koffing/backend/backend.module';
import { AnalyticsComponent } from 'koffing/analytics/analytics.component';
import { DateRangeSelectorComponent } from 'koffing/analytics/dashboard/date-range-selector/date-range-selector.component';
import { LineChartComponent } from 'koffing/analytics/dashboard/line-chart/line-chart.component';
import { DoughnutChartComponent } from 'koffing/analytics/dashboard/doughnut-chart/doughnut-chart.component';
import { StatisticPanelComponent } from 'koffing/analytics/statistic-panel/statistic-panel.component';

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
        FinanceComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        BaseChartDirective,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent
    ]
})
export class AnalyticsModule { }
