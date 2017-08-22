import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { StatisticPanelComponent } from './statistic-panel/statistic-panel.component';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        AnalyticsComponent,
        BaseChartDirective,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent
    ]
})
export class AnalyticsModule { }
