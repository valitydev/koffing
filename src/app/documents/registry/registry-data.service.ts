import { Injectable } from '@angular/core';
import { filter, find, ceil, concat, clone } from 'lodash';
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
    SearchInvoicesParams
} from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { SearchService } from 'koffing/backend/search.service';
import { SearchParams } from './search-params';
import { Registry } from './registry';
import { RegistryItem } from './registry-item';
import { InvoiceSearchResult } from 'koffing/backend/model/invoice-search-result';

type SearchFn<P, R> = (shopID: string, paymentsParams: P) => Observable<R>;

@Injectable()
export class RegistryDataService {

    private limit: number = 1000;

    constructor(public searchService: SearchService,
                private contractService: ContractService,
                private shopService: ShopService) {
    }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<Registry> {
        const searchParams = new SearchParams(fromTime, toTime, this.limit);
        const payments$ = this.loadAllData<SearchPaymentsParams, PaymentSearchResult, Payment>(this.searchService.searchPayments, this.searchService, shopID, searchParams);
        const invoices$ = this.loadAllData<SearchInvoicesParams, InvoiceSearchResult, Invoice>(this.searchService.searchInvoices, this.searchService, shopID, searchParams);
        const contracts$ = this.contractService.getContracts();
        const shop$ = this.shopService.getShopByID(shopID);
        return Observable.forkJoin([payments$, invoices$, contracts$, shop$]).map((response: any[]) => {
            const [payments, invoices, contracts, shop] = response;
            const capturedPayments = filter(payments, (payment: Payment) => payment.status === PAYMENT_STATUS.captured);
            const refundedPayments = filter(payments, (payment: Payment) => payment.status === PAYMENT_STATUS.refunded);
            const capturedPaymentItems = this.getRegistryItems(capturedPayments, invoices);
            const refundedPaymentItems = this.getRegistryItems(refundedPayments, invoices);
            const client = this.getClient(shop, contracts);
            return new Registry(fromTime, toTime, client, capturedPaymentItems, refundedPaymentItems);
        });
    }

    private loadAllData<P, R extends { continuationToken?: string, result: T[] }, T>(fn: SearchFn<P, R>, context: any, shopID: string, params: SearchParams): Observable<T[]> {
        return Observable.create((observer: Observer<T[]>) => {
            const request$ = fn.apply(context, [shopID, params]);
            request$.subscribe((streamData: R) => {
                if (streamData.continuationToken) {
                    const nextParams = {
                        ...params,
                        continuationToken: streamData.continuationToken
                    };
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

    private getRegistryItems(payments: Payment[], invoices: Invoice[]): RegistryItem[] {
        const registryItems: RegistryItem[] = [];
        payments.forEach((payment: Payment) => {
            const registryItem = new RegistryItem();
            registryItem.invoiceID = `${payment.invoiceID}.${payment.id}`;
            registryItem.paymentDate = payment.createdAt;
            registryItem.amount = payment.amount;
            registryItem.fee = payment.fee;
            if (payment.payer.payerType === 'PaymentResourcePayer') {
                const payer = payment.payer as PaymentResourcePayer;
                registryItem.userEmail = payer.contactInfo.email;
            } else {
                registryItem.userEmail = '';
            }
            const foundInvoice = find(invoices, (invoice: Invoice) => invoice.id === payment.invoiceID);
            registryItem.product = (foundInvoice && foundInvoice.product) || '';
            registryItem.description = (foundInvoice && foundInvoice.description) || '';
            registryItems.push(registryItem);
        });
        return registryItems;
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
