import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SearchResult } from './search-result';
import { SearchService } from 'koffing/backend/search.service';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-params';
import { Payment } from 'koffing/backend';

@Injectable()
export class PaymentsService {
    public payments: Payment[] = [];

    private limit = 3;

    private continuationToken: string;

    private currentInvoiceID: string;

    constructor(private searchService: SearchService) {}

    public search(shopID: string, invoiceID: string): Observable<SearchResult> {
        if (invoiceID !== this.currentInvoiceID) {
            this.currentInvoiceID = invoiceID;
            this.payments = [];
            this.continuationToken = null;
        }
        const request = this.toSearchParams(invoiceID, this.limit, this.continuationToken);
        return this.searchService
            .searchPayments(shopID, request)
            .map(paymentResult => this.toSearchResult(paymentResult));
    }

    private toSearchResult(paymentSearchResult: PaymentSearchResult): SearchResult {
        const searchResult = new SearchResult();
        this.payments = this.payments.concat(paymentSearchResult.result);
        searchResult.payments = this.payments;
        this.continuationToken = paymentSearchResult.continuationToken;
        searchResult.isNextAvailable = !!paymentSearchResult.continuationToken;
        return searchResult;
    }

    private toSearchParams(
        invoiceID: string,
        limit: number,
        continuationToken?: string
    ): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.invoiceID = invoiceID;
        result.limit = limit;
        result.continuationToken = continuationToken;
        result.fromTime = moment()
            .subtract(3, 'year')
            .startOf('day')
            .toDate();
        result.toTime = moment()
            .endOf('day')
            .toDate();
        return result;
    }
}
