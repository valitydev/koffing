import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString, forEach, isNumber, isDate } from 'lodash';

import { InvoiceSearchResult } from 'koffing/backend/model/invoice-search-result';
import { ConfigService } from 'koffing/backend/services/config.service';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';
import { SearchInvoicesParams } from 'koffing/backend/requests/search-invoices-request';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';

@Injectable()
export class SearchService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public searchInvoices(shopID: string, invoiceParams: SearchInvoicesParams): Observable<InvoiceSearchResult> {
        const params = this.toSearchParams(invoiceParams);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/invoices`, {search: params})
            .map((res) => res.json());
    }

    public searchPayments(shopID: string, paymentsParams: SearchPaymentsParams): Observable<PaymentSearchResult> {
        const params = this.toSearchParams(paymentsParams);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments`, {search: params})
            .map((res) => res.json());
    }

    private toSearchParams(params: Object): URLSearchParams {
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
