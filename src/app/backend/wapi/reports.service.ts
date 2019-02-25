import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from '../koffing-http.service';
import { ConfigService } from '../config.service';
import { Report } from './model/report';
import { GetReportsQuery, GetReportsPath } from './requests/get-reports-params';
import { toSearchParams } from '../helpers';
import { CreateReportPath, CreateReportQuery } from './requests/create-report-params';
import { toCreateParams } from '../helpers/to-create-params';

@Injectable()
export class ReportsService {
    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public getReports(
        { identityID }: GetReportsPath,
        queryParams: GetReportsQuery
    ): Observable<Report[]> {
        return this.http
            .get(`${this.config.wapiUrl}/identities/${identityID}/reports`, {
                search: toSearchParams(queryParams)
            })
            .map(res => res.json());
    }

    public createReport(
        { identityID }: CreateReportPath,
        queryParams: CreateReportQuery
    ): Observable<Report> {
        return this.http
            .post(
                `${this.config.wapiUrl}/identities/${identityID}/reports`,
                toCreateParams(queryParams)
            )
            .map(res => res.json());
    }
}
