import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents.component';
import { RegistryComponent } from 'koffing/documents/registry/registry.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'documents',
                component: DocumentsComponent,
                children: [
                    {
                        path: 'registry',
                        component: RegistryComponent
                    }
                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DocumentsRoutingModule { }
