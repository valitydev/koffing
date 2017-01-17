import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditShopComponent } from 'koffing/management/management.module';
import { CreateShopComponent } from 'koffing/management/management.module';

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
                component: CreateShopComponent
            },
            {
                path: 'shops/edit/:shopID',
                component: EditShopComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }
