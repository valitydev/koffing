import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from 'koffing/common/common.module';

@NgModule({
    imports: [CommonModule, AccountRoutingModule, BrowserModule],
    declarations: [AccountComponent]
})
export class AccountModule {}
