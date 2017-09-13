import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SearchResult } from './search-result';
import { SearchService } from 'koffing/backend/search.service';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-params';

@Injectable()
export class PaymentsService {

    private limit = 3;

    private detailedRequestLimit = this.limit;

    constructor(private searchService: SearchService) {
    }

    public search(shopID: string, invoiceID: string): Observable<SearchResult> {
        const request = this.toSearchParams(invoiceID, this.detailedRequestLimit);
        return this.searchService.searchPayments(shopID, request)
            .map((paymentResult) => this.toSearchResult(paymentResult, this.detailedRequestLimit))
            .do((paymentResult) => {
                if (paymentResult.isNextAvailable) {
                    this.detailedRequestLimit += this.limit;
                }
            });
    }

    private toSearchResult(paymentSearchResult: PaymentSearchResult, limit: number): SearchResult {
        const searchResult = new SearchResult();
        searchResult.payments = paymentSearchResult.result;
        searchResult.totalCount = paymentSearchResult.totalCount;
        searchResult.isNextAvailable = (paymentSearchResult.totalCount > limit);
        return searchResult;
    }

    private toSearchParams(invoiceID: string, limit: number): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.invoiceID = invoiceID;
        result.limit = limit;
        result.offset = 0;
        result.fromTime = moment().subtract(1, 'year').startOf('day').toDate();
        result.toTime = moment().endOf('day').toDate();
        return result;
    }
}
