import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateShopComponent } from './create-shop/create-shop.component';
import { ManagementComponent } from './management.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'management/shop/create',
                component: CreateShopComponent
            }
        ])
    ]
})
export class ManagementRoutingModule {}
