import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'analytics/:shopID',
                component: AnalyticsComponent,
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
