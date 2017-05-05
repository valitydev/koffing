import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';
import { SearchService } from 'koffing/backend/search.service';
import { SearchResult } from 'koffing/analytics/invoices/search-result/search-details/search-result';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';
import { SearchType } from 'koffing/analytics/invoices/search-result/search-details/search-type';

@Injectable()
export class SearchDetailsService {

    private limit = 3;

    private detailedRequestLimit = this.limit;

    private commonRequestLimit = this.limit;

    private detailed: SearchResult;

    private common: SearchResult;

    private isCommonAvailable: boolean = false;

    constructor(private searchService: SearchService) {
    }

    public search(shopID: string, invoiceID: string, params: FormSearchParams): Observable<SearchResult> {
        return this.searchDetailed(shopID, invoiceID, params);
    }

    private searchDetailed(shopID: string, invoiceID: string, params: FormSearchParams): Observable<SearchResult> {
        const request = this.makeDetailedParams(invoiceID, params);
        return this.searchService.searchPayments(shopID, request)
            .map((paymentResult) => this.toSearchResult(paymentResult, SearchType.detailed, this.detailedRequestLimit))
            .do((paymentResult) => {
                this.detailed = paymentResult;
                if (paymentResult.isNextAvailable) {
                    this.detailedRequestLimit += this.limit;
                } else {
                    this.isCommonAvailable = true;
                }
            });
    }

    private searchCommon(shopID: string, invoiceID: string, params: FormSearchParams): Observable<SearchResult> {
        if (this.isCommonAvailable) {
            const request = this.makeCommonParams(invoiceID, params);
            return this.searchService.searchPayments(shopID, request)
                .map((paymentResult) => this.toSearchResult(paymentResult, SearchType.common, this.commonRequestLimit))
                .do((paymentResult) => {
                    this.common = paymentResult;
                    if (paymentResult.isNextAvailable) {
                        this.commonRequestLimit += this.limit;
                    }
                });
        }
        return Observable.empty();
    }

    private toSearchResult(paymentSearchResult: PaymentSearchResult, searchType: SearchType, limit: number): SearchResult {
        const searchResult = new SearchResult();
        searchResult.result = paymentSearchResult.result.map((payment) => {
            return {payment, searchType};
        });
        searchResult.totalCount = paymentSearchResult.totalCount;
        searchResult.isNextAvailable = (paymentSearchResult.totalCount > limit);
        return searchResult;
    }

    private makeCommonParams(invoiceID: string, params: FormSearchParams): SearchPaymentsParams {
        return this.toCommonSearchParams(invoiceID, this.commonRequestLimit, params);
    }

    private makeDetailedParams(invoiceID: string, params: FormSearchParams): SearchPaymentsParams {
        return this.toDetailedSearchParams(invoiceID, this.detailedRequestLimit, params);
    }

    private toCommonSearchParams(invoiceID: string, limit: number, formParams: FormSearchParams): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.invoiceID = invoiceID;
        result.limit = limit;
        result.offset = 0;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        return result;
    }

    private toDetailedSearchParams(invoiceID: string, limit: number, formParams: FormSearchParams): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.invoiceID = invoiceID;
        result.limit = limit;
        result.offset = 0;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        result.paymentID = formParams.paymentID;
        result.paymentStatus = formParams.paymentStatus;
        result.payerIP = formParams.ip;
        result.payerEmail = formParams.email;
        result.payerFingerprint = formParams.fingerprint;
        result.cardNumberMask = formParams.cardNumberMask;
        return result;
    }
}
