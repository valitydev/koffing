import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateShopWizardComponent } from 'koffing/management/management.module';
import { ContractCreateComponent } from 'koffing/management/components/management-container/contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from 'koffing/management/components/management-container/contracts/payout-tool-create/payout-tool-create.component';
import { ClaimsEditComponent } from 'koffing/management/management.module';
import { ShopEditingComponent } from 'koffing/management/components/management-container/shops/shop-editing/shop-editing.component';

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
                component: ShopEditingComponent
            },
            {
                path: 'shops/:shopID/edit/contract/create',
                component: ContractCreateComponent
            },
            {
                path: 'shops/:shopID/edit/contract/:contractID/payoutTool/create',
                component: PayoutToolCreateComponent
            },
            {
                path: 'claims/edit',
                component: ClaimsEditComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }
