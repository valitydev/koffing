import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, GrowlModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { PayoutsComponent } from './payouts.component';
import { SearchPayoutsFormComponent } from './search-payouts-form/search-payouts-form.component';
import { SearchPayoutsResultComponent } from './search-payouts-result/search-payouts-result.component';
import { PayoutSummaryComponent } from './payout-summary/payout-summary.component';
import { PayoutTypePipe } from './payout-type.pipe';
import { CreateWalletPayoutComponent } from './create-wallet-payout/create-wallet-payout.component';
import { WalletPayoutFormComponent } from './ wallet-payout-form/wallet-payout-form.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        CommonModule,
        BackendModule,
        GrowlModule
    ],
    declarations: [
        CreateWalletPayoutComponent,
        WalletPayoutFormComponent,
        PayoutsComponent,
        SearchPayoutsFormComponent,
        SearchPayoutsResultComponent,
        PayoutSummaryComponent,
        PayoutTypePipe
    ]
})
export class PayoutsModule { }
