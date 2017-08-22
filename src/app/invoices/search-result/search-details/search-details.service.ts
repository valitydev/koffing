import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-params';
import { SearchService } from 'koffing/backend/search.service';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';
import { SearchResult } from 'koffing/invoices/search-result/search-details/search-result';
import { FormSearchParams } from 'koffing/invoices/search-form/form-search-params';

@Injectable()
export class SearchDetailsService {

    private limit = 3;

    private detailedRequestLimit = this.limit;

    private detailed: SearchResult;

    private isCommonAvailable: boolean = false;

    constructor(private searchService: SearchService) {
    }

    public search(shopID: string, invoiceID: string, params: FormSearchParams): Observable<SearchResult> {
        const request = this.toSearchParams(invoiceID, this.detailedRequestLimit, params);
        return this.searchService.searchPayments(shopID, request)
            .map((paymentResult) => this.toSearchResult(paymentResult, this.detailedRequestLimit))
            .do((paymentResult) => {
                this.detailed = paymentResult;
                if (paymentResult.isNextAvailable) {
                    this.detailedRequestLimit += this.limit;
                } else {
                    this.isCommonAvailable = true;
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

    private toSearchParams(invoiceID: string, limit: number, formParams: FormSearchParams): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.invoiceID = invoiceID;
        result.limit = limit;
        result.offset = 0;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        return result;
    }
}
