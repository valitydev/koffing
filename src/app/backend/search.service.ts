import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString, forEach, isNumber, isDate } from 'lodash';

import { ConfigService } from './config.service';
import { InvoiceSearchResult } from './model/invoice-search-result';
import { PaymentSearchResult } from './model/payment-search-result';
import { InvoiceTemplatesSearchResult } from './model/invoice-template/invoice-templates-search-result';
import { SearchInvoicesParams } from './requests/search-invoices-params';
import { SearchPaymentsParams } from './requests/search-payments-params';
import { SearchInvoiceTemplatesParams } from './requests/search-invoice-templates-params';

@Injectable()
export class SearchService {

    constructor(
        private http: Http,
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

    public searchInvoiceTemplates(shopID: string, invoiceTemplatesParams: SearchInvoiceTemplatesParams): Observable<InvoiceTemplatesSearchResult> {
        const params = this.toSearchParams(invoiceTemplatesParams);
        return this.http.get(`${this.config.capiUrl}/processing/shops/${shopID}/invoice-templates`, {search: params})
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
