import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from '../koffing-http.service';
import { ConfigService } from '../config.service';
import { DownloadFilePathParams, DownloadFileParams } from './requests/download-file-params';
import { File } from './model/file';
import { toSearchParams } from '../helpers';

@Injectable()
export class DownloadFileService {
    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public downloadFile(
        { fileID }: DownloadFilePathParams,
        queryParams: DownloadFileParams
    ): Observable<File> {
        return this.http
            .post(
                `${this.config.wapiUrl}/files/${fileID}/download`,
                {},
                {
                    search: toSearchParams(queryParams)
                }
            )
            .map(res => res.json());
    }
}
