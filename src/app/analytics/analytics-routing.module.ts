import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components/analytic-selection/dashboard/dashboard.component';
import { FinanceComponent } from './components/analytic-selection/finance/finance.component';
import { AnalyticSelectionComponent } from './components/analytic-selection/analytic-selection.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'analytics',
                component: AnalyticSelectionComponent
            },
            {
                path: 'analytics/:shopID',
                component: AnalyticSelectionComponent
            },
            {
                path: 'analytics/:shopID',
                component: AnalyticSelectionComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    {
                        path: 'finance',
                        component: FinanceComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AnalyticsRoutingModule { }
