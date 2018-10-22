import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DownloadService } from 'koffing/backend/download.service';
import { FileMeta } from 'koffing/backend';

@Component({
    selector: 'kof-report-files',
    templateUrl: 'report-files.component.pug'
})
export class ReportFilesComponent implements OnInit {

    @Input()
    public files: FileMeta[];

    @Input()
    public reportID: number;

    private shopID: string;

    constructor(
        private route: ActivatedRoute,
        private downloadService: DownloadService) {
    }

    public ngOnInit() {
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }

    public downloadFile(fileID: string, fileName: string) {
        this.downloadService.downloadReport(this.shopID, this.reportID, fileID)
            .subscribe((reportLink) => this.download(fileName, reportLink.url));
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
