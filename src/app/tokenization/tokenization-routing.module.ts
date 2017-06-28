import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokenComponent } from './components/token/token.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'key',
                component: TokenComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TokenizationRoutingModule { }
