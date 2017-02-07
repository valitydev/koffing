import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './components/analytic-selection/dashboard/dashboard.component';
import { FinanceComponent } from './components/analytic-selection/finance/finance.component';
import { PaginateComponent } from './components/analytic-selection/finance/paginate/paginate.component';
import { SearchFormComponent } from './components/analytic-selection/finance/search-form/search-form.component';
import { SearchResultComponent } from './components/analytic-selection/finance/search-result/search-result.component';
import { PaymentMethodComponent } from './components/analytic-selection/dashboard/payment-method/payment-method.component';
import { ConversionComponent } from './components/analytic-selection/dashboard/conversion/conversion.component';
import { RevenueComponent } from './components/analytic-selection/dashboard/revenue/revenue.component';
import { GeolocationComponent } from './components/analytic-selection/dashboard/geolocation/geolocation.component';
import { AnalyticSelectionComponent } from './components/analytic-selection/analytic-selection.component';
import { PaginationPipe } from './components/analytic-selection/finance/paginate/pagination.pipe';
import { PaymentStatusPipe } from './components/analytic-selection/finance/search-result/payment-statuses.pipe';
import { RoubleCurrencyPipe } from './components/analytic-selection/rouble-currency.pipe';
import { CommonModule } from 'koffing/common/common.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BackendModule } from 'koffing/backend/backend.module';

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
        AnalyticSelectionComponent,
        DashboardComponent,
        FinanceComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        BaseChartDirective,
        PaymentMethodComponent,
        ConversionComponent,
        RevenueComponent,
        GeolocationComponent,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe
    ]
})
export class AnalyticsModule { }

export * from './components/analytic-selection/analytic-selection.component';
