import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management-container/management.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { EditShopComponent } from './components/management-container/shops/edit-shop/edit-shop.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';
import { ContractCreateComponent } from './components/management-container/contracts/contract-create/contract-create.component';
import { PayoutAccountCreateComponent } from './components/management-container/contracts/payout-account-create/payout-account-create.component';

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
                        path: 'contracts/:contractID/payout-account/create',
                        component: PayoutAccountCreateComponent
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
