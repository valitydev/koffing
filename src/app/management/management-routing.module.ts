import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management-container/management.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';
import { ContractCreateComponent } from './components/management-container/contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from './components/management-container/contracts/payout-tool-create/payout-tool-create.component';

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
                    },
                    {
                        path: 'contracts/create',
                        component: ContractCreateComponent
                    },
                    {
                        path: 'contracts/:contractID/payout-tool/create',
                        component: PayoutToolCreateComponent
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
