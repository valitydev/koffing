import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';

@Injectable()
export class DownloadService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public downloadReport(shopID: string, reportID: number, fileID: string): Observable<Blob> {
        return this.http.get(`${this.config.capiUrl}/shops/${shopID}/reports/${reportID}/files/${fileID}/download`, {
            responseType: ResponseContentType.Blob
        }).map((response) => response.blob());
    }
}
