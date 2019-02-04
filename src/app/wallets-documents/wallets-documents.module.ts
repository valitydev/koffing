import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { WalletsDocumentsComponent } from './wallets-documents.component';
import { SearchReportsResultComponent } from './reports/search-result/search-reports-result.component';
import { ReportFilesComponent } from './reports/search-result/report-files/report-files.component';
import { WalletsReportsComponent } from './reports/wallets-reports.component';
import { ReportsService } from 'koffing/backend/wapi/reports.service';
import { ReportStatusPipe as WalletsReportStatusPipe } from './reports/search-result/report-status.pipe';

@NgModule({
    providers: [ReportsService],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        BackendModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        WalletsDocumentsComponent,
        SearchReportsResultComponent,
        ReportFilesComponent,
        WalletsReportsComponent,
        WalletsReportStatusPipe
    ]
})
export class WalletsDocumentsModule {}
