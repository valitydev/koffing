import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditShopComponent } from 'koffing/management/management.module';
import { CreateShopWizardComponent } from 'koffing/management/management.module';
import { ContractCreateComponent } from 'koffing/management/components/management-container/contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from 'koffing/management/components/management-container/contracts/payout-tool-create/payout-tool-create.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/analytics',
                pathMatch: 'full'
            },
            {
                path: 'shops/create',
                component: CreateShopWizardComponent
            },
            {
                path: 'shops/:shopID/edit',
                component: EditShopComponent
            },
            {
                path: 'shops/:shopID/edit/contract/create',
                component: ContractCreateComponent
            },
            {
                path: 'shops/:shopID/edit/contract/:contractID/payoutTool/create',
                component: PayoutToolCreateComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }
