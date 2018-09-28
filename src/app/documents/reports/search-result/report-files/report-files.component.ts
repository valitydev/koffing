import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DownloadService } from 'src/app/backend/download.service';
import { FileMeta } from 'src/app/backend/index';

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
            .subscribe((file: Blob) => this.download(fileName, file));
    }

    private download(fileName: string, file: Blob) {
        const a: any = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
