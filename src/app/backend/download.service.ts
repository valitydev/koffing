import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { ReportLink } from 'koffing/backend/model';

@Injectable()
export class DownloadService {

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) { }

    public downloadReport(shopID: string, reportID: number, fileID: string): Observable<ReportLink> {
        return this.http.get(`${this.config.capiUrl}/shops/${shopID}/reports/${reportID}/files/${fileID}/download`)
            .map((response) => response.json());
    }
}
