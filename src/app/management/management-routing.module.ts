import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management-container/management.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'management',
                component: ManagementComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/management/shops',
                        pathMatch: 'full'
                    },
                    {
                        path: 'shops',
                        component: ShopsComponent
                    },
                    {
                        path: 'contracts',
                        component: ContractsComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManagementRoutingModule {}
