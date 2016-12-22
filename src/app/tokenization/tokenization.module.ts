import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TokenizationRoutingModule } from './tokenization-routing.module';
import { OfflineTokenComponent } from './components/offline-token/offline-token.component';

@NgModule({
    imports: [
        BrowserModule,
        TokenizationRoutingModule
    ],
    declarations: [
        OfflineTokenComponent
    ]
})
export class TokenizationModule { }

export * from './components/offline-token/offline-token.component';
