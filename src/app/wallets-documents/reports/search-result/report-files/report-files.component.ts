import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { DownloadFileService } from 'koffing/backend/wapi/download-file.service';
import { Report } from 'koffing/backend/wapi/model/report';

@Component({
    selector: 'kof-report-files',
    templateUrl: 'report-files.component.pug'
})
export class ReportFilesComponent {
    @Input()
    public files: Report['files'];

    @Input()
    public reportID: number;

    constructor(private downloadFileService: DownloadFileService) {}

    public downloadFile(fileID: string, fileName: string) {
        this.downloadFileService
            .downloadFile(
                { fileID },
                {
                    expiresAt: moment()
                        .add(1, 'minute')
                        .utc()
                        .format()
                }
            )
            .subscribe(file => this.download(fileName, file.url));
    }

    private download(fileName: string, url: string) {
        const a: any = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = fileName;
        a.click();
        a.parentNode.removeChild(a);
    }
}
