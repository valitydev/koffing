import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AccountComponent } from 'koffing/account/components/account.component';
import { AccountRoutingModule } from 'koffing/account/account-routing.module';
import { CommonModule } from 'koffing/common/common.module';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        BrowserModule
    ],
    declarations: [
        AccountComponent
    ]
})
export class AccountModule { }

export * from './components/account.component';
