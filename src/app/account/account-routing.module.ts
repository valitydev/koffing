import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from 'koffing/account/components/account.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'account',
                component: AccountComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule {}
