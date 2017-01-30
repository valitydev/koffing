import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditShopComponent } from 'koffing/management/management.module';
import { CreateShopWizardComponent } from 'koffing/management/management.module';
import { EditShopContractComponent } from 'koffing/management/management.module';
import { EditShopPayoutAccountComponent } from 'koffing/management/management.module';

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
                path: 'shops/edit/:shopID',
                component: EditShopComponent
            },
            {
                path: 'shops/edit/:shopID/contract',
                component: EditShopContractComponent
            },
            {
                path: 'shops/edit/:shopID/contract/:contractID/account',
                component: EditShopPayoutAccountComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }
