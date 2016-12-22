import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OfflineTokenComponent } from './components/offline-token/offline-token.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tokenization',
                component: OfflineTokenComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TokenizationRoutingModule { }
