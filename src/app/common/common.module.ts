import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './components/select/select.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MinValueValidatorDirective } from 'koffing/common/min-value.directive';
import { MaxValueValidatorDirective } from 'koffing/common/max-value.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective
    ],
    exports: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective
    ]
})
export class CommonModule { }

export * from './components/loading/loading.component';
export * from './components/select/select.component';
export * from './components/select/select.class';
