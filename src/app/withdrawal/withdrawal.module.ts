import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from 'koffing/common/common.module';
import { WithdrawalComponent } from './withdrawal.component';
import { WithdrawalDetailsComponent } from './withdrawal-details/withdrawal-details.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
    ],
    declarations: [
        WithdrawalComponent,
        WithdrawalDetailsComponent
    ]
})
export class WithdrawalModule { }
