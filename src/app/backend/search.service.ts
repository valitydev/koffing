import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString, forEach, isNumber, isDate } from 'lodash';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import {
    SearchInvoicesParams,
    SearchPaymentsParams,
    SearchPayoutsParams,
    SearchReportParams,
    SearchRefundsParams,
    SearchWalletWithdrawals,
    SearchWalletsParams
} from './requests';
import {
    InvoiceSearchResult,
    PaymentSearchResult,
    PayoutSearchResult,
    RefundsSearchResult,
    Report,
    WalletsSearchResult,
    Withdrawal,
    WithdrawalSearchResult
} from './model';

@Injectable()
export class SearchService {

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) { }

    public searchInvoices(shopID: string, invoiceParams: SearchInvoicesParams): Observable<InvoiceSearchResult> {
        const search = this.toSearchParams(invoiceParams);
        return this.http.get(`${this.getCapiEndpoint(shopID)}/invoices`, {search})
            .map((res) => res.json());
    }

    public searchPayments(shopID: string, paymentsParams: SearchPaymentsParams): Observable<PaymentSearchResult> {
        const search = this.toSearchParams(paymentsParams);
        return this.http.get(`${this.getCapiEndpoint(shopID)}/payments`, {search})
            .map((res) => res.json());
    }

    public searchRefunds(shopID: string, refundsParams: SearchRefundsParams): Observable<RefundsSearchResult> {
        const search = this.toSearchParams(refundsParams);
        return this.http.get(`${this.getCapiEndpoint(shopID)}/refunds`, {search})
            .map((res) => res.json());
    }

    public searchPayouts(shopID: string, payoutsParams: SearchPayoutsParams): Observable<PayoutSearchResult> {
        const search = this.toSearchParams(payoutsParams);
        return this.http.get(`${this.getCapiEndpoint(shopID)}/payouts`, {search})
            .map((res) => res.json());
    }

    public getReports(shopID: string, reportParams: SearchReportParams): Observable<Report[]> {
        const search = this.toSearchParams(reportParams);
        return this.http.get(`${this.config.capiUrl}/shops/${shopID}/reports`, {search})
            .map((res) => res.json());
    }

    public searchWalletWithdrawals(withdrawalsParams: SearchWalletWithdrawals): Observable<WithdrawalSearchResult> {
        const search = this.toSearchParams(withdrawalsParams);
        return this.http.get(`${this.config.wapiUrl}/withdrawals`, {search})
            .map((res) => res.json());
    }

    public searchWalletWithdrawal(withdrawalID: string): Observable<Withdrawal> {
        return this.http.get(`${this.config.wapiUrl}/withdrawals/${withdrawalID}`)
                   .map((res) => res.json());
    }

    public searchWallets(walletsParams: SearchWalletsParams): Observable<WalletsSearchResult> {
        const search = this.toSearchParams(walletsParams);
        return this.http.get(`${this.config.wapiUrl}/wallets`, {search})
            .map((res) => res.json());
    }

    private getCapiEndpoint(shopID: string): string {
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
