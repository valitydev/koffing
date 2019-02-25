import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from 'koffing/common/common.module';
import { DepositComponent } from './deposit.component';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';

@NgModule({
    imports: [BrowserModule, CommonModule],
    declarations: [DepositComponent, DepositDetailsComponent]
})
export class DepositModule {}
