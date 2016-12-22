import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './components/select/select.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent
    ],
    exports: [
        SelectComponent,
        LoadingComponent
    ]
})
export class CommonModule { }

export * from './components/loading/loading.component';
export * from './components/select/select.component';
export * from './components/select/select.class';
