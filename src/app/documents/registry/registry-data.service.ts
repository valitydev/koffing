import { Injectable } from '@angular/core';
import { find, ceil, concat, clone, get } from 'lodash';
import { Observable, Observer } from 'rxjs';

import {
    PAYMENT_STATUS,
    Shop,
    Contract,
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
        const payments$ = this.loadAllDataParallel<SearchPaymentsParams, PaymentSearchResult, Payment>(this.searchService.searchPayments, this.searchService, shopID, paymentsSearchParams, 3);
        const refunds$ = this.loadAllOffsetData<SearchRefundsParams, RefundsSearchResult, Refund>(this.searchService.searchRefunds, this.searchService, shopID, refundsSearchParams);
        const invoices$ = this.loadAllDataParallel<SearchInvoicesParams, InvoiceSearchResult, Invoice>(this.searchService.searchInvoices, this.searchService, shopID, invoicesSearchParams, 3);
        const contracts$ = this.contractService.getContracts();
        const shop$ = this.shopService.getShopByID(shopID);
        return Observable.forkJoin([payments$, refunds$, invoices$, contracts$, shop$]).map((response: any[]) => {
            const [payments, refunds, invoices, contracts, shop] = response;
            const capturedPaymentItems = this.getPaymentRegistryItems(payments, invoices);
            const refundedPaymentItems = this.getRefundRegistryItems(refunds);
            const client = this.getClient(shop, contracts);
            return new Registry(fromTime, toTime, client, capturedPaymentItems, refundedPaymentItems);
        });
    }

    private loadAllDataParallel<P extends {fromTime: Date, toTime: Date}, R extends { continuationToken?: string, result: T[] }, T>(fn: SearchFn<P, R>, context: any, shopID: string, params: P, countRequests: number = 1): Observable<T[]> {
        const streamRequests$: any[] = [];
        console.dir((params.toTime.getTime() - params.fromTime.getTime()) / countRequests);
        const intervalMs = Math.floor((params.toTime.getTime() - params.fromTime.getTime()) / countRequests / 1000) * 1000;
        console.dir(intervalMs);
        for (let i = 1, lastToTime = params.fromTime; i <= countRequests; i++) {
            console.dir(i);
            const nextParams = Object.assign({}, params, {});
            nextParams.fromTime = lastToTime;
            nextParams.toTime = i === countRequests ? params.toTime : new Date(lastToTime.getTime() + intervalMs);
            lastToTime = nextParams.toTime;
            const request$ = this.loadAllData(fn, context, shopID, nextParams);
            streamRequests$.push(request$);
        }
        let searchData: any[] = [];
        return Observable.create((observer: Observer<R[]>) => {
            Observable.forkJoin(streamRequests$).subscribe((streamData: any[]) => {
                streamData.forEach((data) => searchData = concat(searchData, data));
                observer.next(searchData);
                observer.complete();
            });
        });
    }

    private loadAllData<P extends {fromTime: Date, toTime: Date}, R extends { continuationToken?: string, result: T[] }, T>(fn: SearchFn<P, R>, context: any, shopID: string, params: P): Observable<T[]> {
        return Observable.create((observer: Observer<T[]>) => {
            const request$ = fn.apply(context, [shopID, params]);
            request$.subscribe((streamData: R) => {
                if (streamData.continuationToken) {
                    const nextParams: P = Object.assign({}, params, {continuationToken: streamData.continuationToken});
                    this.loadAllData(fn, context, shopID, nextParams).subscribe(
                        (result: T[]) => {
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

    private loadAllOffsetData<P extends { offset?: number, limit: number }, R extends { totalCount: number, result: T[] }, T>(fn: SearchFn<P, R>, context: any, shopID: string, params: P): Observable<T[]> {
        return Observable.create((observer: Observer<R>) => {
            fn.apply(context, [shopID, params]).subscribe((response: any) => {
                let searchData = response.result;
                const countRequests = ceil(response.totalCount / params.limit);
                if (countRequests > 1) {
                    const streamRequests$ = [];
                    for (let i = 1; i < countRequests; i++) {
                        const modified = clone(params);
                        modified.offset = params.limit * i;
                        const request$ = fn.apply(context, [shopID, modified]);
                        streamRequests$.push(request$);
                    }
                    Observable.forkJoin(streamRequests$).subscribe((streamData: any[]) => {
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

    private getClient(shop: Shop, contracts: Contract[]): string {
        let client = '';
        const activeContract = find(contracts, (contract: Contract) => contract.id === shop.contractID);
        if (activeContract.contractor) {
            const legalEntity = activeContract.contractor as RussianLegalEntity;
            client = legalEntity.registeredName;
        }
        return client;
    }
}
