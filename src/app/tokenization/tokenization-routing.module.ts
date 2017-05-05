import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenComponent } from 'koffing/tokenization/components/token/token.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'api/key',
                component: TokenComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TokenizationRoutingModule { }
