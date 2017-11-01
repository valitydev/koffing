import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString, forEach, isNumber, isDate } from 'lodash';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import {
    SearchInvoicesParams,
    SearchPaymentsParams,
    SearchPayoutsParams,
    SearchReportParams
} from './requests';
import {
    InvoiceSearchResult,
    PaymentSearchResult
} from './model';

@Injectable()
export class SearchService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public searchInvoices(shopID: string, invoiceParams: SearchInvoicesParams): Observable<InvoiceSearchResult> {
        const search = this.toSearchParams(invoiceParams);
        return this.http.get(`${this.getEndpoint(shopID)}/invoices`, {search})
            .map((res) => res.json());
    }

    public searchPayments(shopID: string, paymentsParams: SearchPaymentsParams): Observable<PaymentSearchResult> {
        const search = this.toSearchParams(paymentsParams);
        return this.http.get(`${this.getEndpoint(shopID)}/payments`, {search})
            .map((res) => res.json());
    }

    public searchPayouts(shopID: string, payoutsParams: SearchPayoutsParams): Observable<PaymentSearchResult> {
        const search = this.toSearchParams(payoutsParams);
        return this.http.get(`${this.getEndpoint(shopID)}/payouts`, {search})
            .map((res) => res.json());
    }

    public getReports(shopID: string, reportParams: SearchReportParams): Observable<any> { // todo type
        const search = this.toSearchParams(reportParams);
        return this.http.get(`${this.config.capiUrl}/shops/${shopID}/reports`, {search})
            .map((res) => res.json());
    }

    private getEndpoint(shopID: string): string {
        return `${this.config.capiUrl}/analytics/shops/${shopID}`;
    }

    private toSearchParams(params: object): URLSearchParams {
        const result = new URLSearchParams();
        forEach(params, (value, field) => {
            if (value) {
                if (isDate(value)) {
                    result.set(field, this.toUTC(value));
                } else if (isNumber(value)) {
                    result.set(field, toString(value));
                } else {
                    result.set(field, value);
                }
            }
        });
        return result;
    }

    private toUTC(date: Date): string {
        return moment(date).utc().format();
    }
}
