import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DocumentsComponent } from 'koffing/documents/documents.component';
import { DocumentsRoutingModule } from 'koffing/documents/documents-routing.module';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { RegistryComponent } from 'koffing/documents/registry/registry.component';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        DocumentsComponent,
        RegistryComponent
    ]
})
export class DocumentsModule { }
