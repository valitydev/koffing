import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TokenizationRoutingModule } from './tokenization-routing.module';
import { TokenComponent } from 'koffing/tokenization/components/token/token.component';

@NgModule({
    imports: [
        BrowserModule,
        TokenizationRoutingModule
    ],
    declarations: [
        TokenComponent
    ]
})
export class TokenizationModule { }

export * from './components/token/token.component';
