import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';
import { ShopsComponent } from './shops/shops.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractCreateComponent } from './contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from './contracts/payout-tool-create/payout-tool-create.component';

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
