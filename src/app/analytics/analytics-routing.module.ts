import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RegistryComponent } from './registry/registry.component';

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
                        path: 'invoices',
                        component: InvoicesComponent
                    },
                    {
                        path: 'registry',
                        component: RegistryComponent
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
