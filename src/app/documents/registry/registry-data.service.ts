import { Injectable } from '@angular/core';
import { ceil, concat, get } from 'lodash';
import { Observable, Observer } from 'rxjs';

import {
    PAYMENT_STATUS,
    Invoice,
    Payment,
    RussianLegalEntity,
    PaymentResourcePayer,
    SearchPaymentsParams,
    PaymentSearchResult,
    SearchInvoicesParams,
    RefundsSearchResult,
    Refund
} from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { SearchService } from 'koffing/backend/search.service';
import { SearchParams } from './search-params';
import { Registry } from './registry';
import { PaymentRegistryItem } from './payment-registry-item';
import { RefundRegistryItem } from './refund-registry-item';
import { InvoiceSearchResult } from 'koffing/backend/model/invoice-search-result';
import { SearchRefundsParams } from 'koffing/backend/requests';

type SearchFn<P, R> = (shopID: string, paymentsParams: P) => Observable<R>;

@Injectable()
export class RegistryDataService {

    private limit: number = 1000;

    constructor(public searchService: SearchService,
                private contractService: ContractService,
                private shopService: ShopService) {
    }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<Registry> {
        const paymentsSearchParams: SearchPaymentsParams = {
            fromTime,
            toTime,
            limit: this.limit,
            paymentStatus: PAYMENT_STATUS.captured
        };
        const refundsSearchParams: SearchRefundsParams = {
            fromTime,
            toTime,
            limit: this.limit,
            refundStatus: 'succeeded'
        };
        const invoicesSearchParams = new SearchParams(fromTime, toTime, this.limit);
        const payments$ = this.loadAllDataParallel<SearchPaymentsParams, PaymentSearchResult, Payment>(this.searchService.searchPayments, this.searchService, shopID, paymentsSearchParams, 5);
        const refunds$ = this.loadAllOffsetData<SearchRefundsParams, RefundsSearchResult, Refund>(this.searchService.searchRefunds, this.searchService, shopID, refundsSearchParams);
        const invoices$ = this.loadAllDataParallel<SearchInvoicesParams, InvoiceSearchResult, Invoice>(this.searchService.searchInvoices, this.searchService, shopID, invoicesSearchParams, 5);
        const shop$ = this.shopService.getShopByID(shopID);
        return Observable.create((observer: Observer<Registry>) => {
            Observable.forkJoin([payments$, refunds$, invoices$, shop$]).subscribe((response: any[]) => {
                const [payments, refunds, invoices, shop] = response;
                const contract$ = this.contractService.getContractByID(shop.contractID);
                return contract$.subscribe((contract) => {
                    const {registeredName: client} = contract.contractor as RussianLegalEntity;
                    const capturedPaymentItems = this.getPaymentRegistryItems(payments, invoices);
                    const refundedPaymentItems = this.getRefundRegistryItems(refunds);
                    observer.next(new Registry(fromTime, toTime, client, capturedPaymentItems, refundedPaymentItems));
                    observer.complete();
                });
            });
        });
    }

    private loadAllDataParallel<Params extends { fromTime: Date, toTime: Date }, Result extends { continuationToken?: string, result: Item[] }, Item>(fn: SearchFn<Params, Result>, context: any, shopID: string, params: Params, countRequests: number = 1): Observable<Item[]> {
        const fullIntervalMs = params.toTime.getTime() - params.fromTime.getTime();
        if (fullIntervalMs < 24 * 60 * 60 * 1000 || fullIntervalMs < countRequests * 1000) {
            countRequests = 1;
        }
        const intervalMs = Math.floor(fullIntervalMs / countRequests / 1000) * 1000;
        const streamRequests$: Array<Observable<Item[]>> = [];
        for (let i = 1, lastToTime = params.fromTime; i <= countRequests; i++) {
            const nextParams = Object.assign({}, params, {});
            nextParams.fromTime = lastToTime;
            nextParams.toTime = i === countRequests ? params.toTime : new Date(lastToTime.getTime() + intervalMs);
            lastToTime = nextParams.toTime;
            const request$ = this.loadAllData<Params, Result, Item>(fn, context, shopID, nextParams);
            streamRequests$.push(request$);
        }
        let searchData: Item[] = [];
        return Observable.create((observer: Observer<Item[]>) => {
            Observable.forkJoin(streamRequests$).subscribe((streamData: Item[][]) => {
                streamData.forEach((data) => searchData = concat(searchData, data));
                observer.next(searchData);
                observer.complete();
            });
        });
    }

    private loadAllData<Params extends { fromTime: Date, toTime: Date }, Result extends { continuationToken?: string, result: Item[] }, Item>(fn: SearchFn<Params, Result>, context: any, shopID: string, params: Params): Observable<Item[]> {
        return Observable.create((observer: Observer<Item[]>) => {
            const request$ = fn.apply(context, [shopID, params]);
            request$.subscribe((streamData: Result) => {
                if (streamData.continuationToken) {
                    const nextParams: Params = Object.assign({}, params, {continuationToken: streamData.continuationToken});
                    this.loadAllData(fn, context, shopID, nextParams).subscribe(
                        (result: Item[]) => {
                            const data = concat(streamData.result, result);
                            observer.next(data);
                            observer.complete();
                        }
                    );
                } else {
                    observer.next(streamData.result);
                    observer.complete();
                }
            });
        });
    }

    private loadAllOffsetData<Params extends { offset?: number, limit: number }, Result extends { totalCount: number, result: Item[] }, Item>(fn: SearchFn<Params, Result>, context: any, shopID: string, params: Params): Observable<Item[]> {
        return Observable.create((observer: Observer<Item[]>) => {
            fn.apply(context, [shopID, params]).subscribe((response: Result) => {
                let searchData: Item[] = response.result;
                const countRequests = ceil(response.totalCount / params.limit);
                if (countRequests > 1) {
                    const streamRequests$: Array<Observable<Result>> = [];
                    for (let i = 1; i < countRequests; i++) {
                        const nextParams = Object.assign({}, params, {offset: params.limit * i});
                        const request$ = fn.apply(context, [shopID, nextParams]);
                        streamRequests$.push(request$);
                    }
                    Observable.forkJoin(streamRequests$).subscribe((streamData: Result[]) => {
                        streamData.forEach((data) => searchData = concat(searchData, data.result));
                        observer.next(searchData);
                        observer.complete();
                    });
                } else {
                    observer.next(searchData);
                    observer.complete();
                }
            });
        });
    }

    private getPaymentRegistryItems(payments: Payment[], invoices: Invoice[]): PaymentRegistryItem[] {
        // optimization: get 'map-object'[key] much faster than 'array'.find({id} => id === key)
        const invoicesObject: { [id: string]: Invoice } = invoices.reduce((map, invoice) => {
            map[invoice.id] = invoice;
            return map;
        }, {});
        return payments.map((payment) => {
            const invoice = invoicesObject[payment.invoiceID];
            return {
                invoiceID: `${payment.invoiceID}.${payment.id}`,
                paymentDate: payment.statusChangedAt || payment.createdAt,
                amount: payment.amount,
                fee: payment.fee,
                userEmail: payment.payer.payerType === 'PaymentResourcePayer' ? (payment.payer as PaymentResourcePayer).contactInfo.email : '',
                product: get(invoice, 'product', ''),
                description: get(invoice, 'description', ''),
            };
        });
    }

    private getRefundRegistryItems(refunds: Refund[]): RefundRegistryItem[] {
        return refunds.map((refund) => ({
            invoiceID: `${refund.invoiceID}.${refund.paymentID}`,
            refundDate: refund.createdAt,
            amount: refund.amount
        }));
    }
}
