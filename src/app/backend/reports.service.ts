import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { isDate, reduce } from 'lodash';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { CreateReportParams } from './requests';
import { Report } from './model';

@Injectable()
export class ReportsService {
    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public createReport(shopID: string, reportParams: CreateReportParams): Observable<Report> {
        return this.http
            .post(
                `${this.config.capiUrl}/shops/${shopID}/reports`,
                this.toCreateParams(reportParams)
            )
            .map(res => res.json());
    }

    private toCreateParams(params: object): object {
        return reduce(
            params,
            (acc, value, key) => {
                if (value) {
                    if (isDate(value)) {
                        return { ...acc, [key]: this.toUTC(value) };
                    } else {
                        return { ...acc, [key]: value };
                    }
                } else {
                    return acc;
                }
            },
            {}
        );
    }

    private toUTC(date: Date): string {
        return moment(date)
            .utc()
            .format();
    }
}
