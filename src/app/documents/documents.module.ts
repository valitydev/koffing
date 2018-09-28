import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DocumentsComponent } from './documents.component';
import { SearchReportsResultComponent } from './reports/search-result/search-reports-result.component';
import { ReportFilesComponent } from './reports/search-result/report-files/report-files.component';
import { ReportTypePipe } from './reports/search-result/report-type.pipe';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        DocumentsComponent,
        SearchReportsResultComponent,
        ReportFilesComponent,
        ReportTypePipe,
        ReportsComponent
    ]
})
export class DocumentsModule { }
