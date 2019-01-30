import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'invoices',
                component: InvoicesComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
