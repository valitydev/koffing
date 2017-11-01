import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DocumentsComponent } from './documents.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchReportsResultComponent } from './reports/search-reports-result/search-reports-result.component';
import { ReportFilesComponent } from './reports/search-reports-result/report-files/report-files.component';
import { ReportTypePipe } from './reports/search-reports-result/report-type.pipe';
import { RegistryComponent } from './registry/registry.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        DocumentsComponent,
        ReportsComponent,
        SearchReportsResultComponent,
        ReportFilesComponent,
        ReportTypePipe,
        RegistryComponent,
    ]
})
export class DocumentsModule { }
