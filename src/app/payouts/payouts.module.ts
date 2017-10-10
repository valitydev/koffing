import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { PayoutsComponent } from './payouts.component';
import { SearchPayoutsFormComponent } from './search-payouts-form/search-payouts-form.component';
import { SearchPayoutsResultComponent } from './search-payouts-result/search-payouts-result.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        CommonModule,
        BackendModule,
    ],
    declarations: [
        PayoutsComponent,
        SearchPayoutsFormComponent,
        SearchPayoutsResultComponent
    ]
})
export class PayoutsModule { }
