import { NgModule } from '@angular/core';

import { ReportsService } from './reports.service';
import { DownloadFileService } from './download-file.service';

@NgModule({
    providers: [ReportsService, DownloadFileService]
})
export class WAPIModule {}
