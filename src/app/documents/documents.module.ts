import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DocumentsComponent } from './documents.component';
import { SearchReportsResultComponent } from './reports/search-result/search-reports-result.component';
import { ReportFilesComponent } from './reports/search-result/report-files/report-files.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from 'koffing/backend/reports.service';

@NgModule({
    providers: [ReportsService],
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
        ReportsComponent
    ]
})
export class DocumentsModule { }
