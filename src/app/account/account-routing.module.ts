import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'account',
                redirectTo: 'account/edit',
                pathMatch: 'full'
            },
            {
                path: 'account/:path',
                component: AccountComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {}
