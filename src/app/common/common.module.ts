import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { SelectComponent } from './select/select.component';
import { LoadingComponent } from './loading/loading.component';
import { MinValueValidatorDirective } from './min-value.directive';
import { MaxValueValidatorDirective } from './max-value.directive';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent
    ],
    exports: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent
    ]
})
export class CommonModule { }
