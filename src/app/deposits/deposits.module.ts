import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { DepositsComponent } from './deposits.component';
import { DepositsTableComponent } from './deposits-table/deposits-table.component';
import { SearchFormComponent } from './deposits-table/search-form/search-form.component';
import { SearchResultComponent } from './deposits-table/search-result/search-result.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule, CalendarModule],
    declarations: [
        DepositsComponent,
        DepositsTableComponent,
        SearchFormComponent,
        SearchResultComponent
    ]
})
export class DepositsModule {}
