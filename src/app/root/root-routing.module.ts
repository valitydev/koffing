import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// todo выпилить эти костыли, перенести в management.module
import { ContractCreateComponent } from 'koffing/management/contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from 'koffing/management/contracts/payout-tool-create/payout-tool-create.component';
import { ShopEditingComponent } from 'koffing/management/shops/shop-editing/shop-editing.component';
import { CreateShopWizardComponent } from 'koffing/management/shops/create-shop-wizard/create-shop-wizard.component';
import { ClaimsEditComponent } from 'koffing/management/claims/claims-edit/claims-edit.component';

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
