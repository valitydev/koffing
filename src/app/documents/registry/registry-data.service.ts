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

type SearchPaymentsFn = (shopID: string, paymentsParams: SearchPaymentsParams) => Observable<PaymentSearchResult>;
type SearchInvoicesFn = (shopID: string, paymentsParams: SearchInvoicesParams) => Observable<InvoiceSearchResult>;

@Injectable()
export class RegistryDataService {

    private limit: number = 1000;

    constructor(public searchService: SearchService,
                private contractService: ContractService,
                private shopService: ShopService) {
    }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<Registry> {
        const searchParams = new SearchParams(fromTime, toTime, this.limit);
        const payments$ = this.loadAllData(this.searchService.searchPayments, this.searchService, shopID, searchParams);
        const invoices$ = this.loadAllData(this.searchService.searchInvoices, this.searchService, shopID, searchParams);
        const contracts$ = this.contractService.getContracts();
        const shop$ = this.shopService.getShopByID(shopID);
        return Observable.forkJoin([payments$, invoices$, contracts$, shop$]).map((response) => {
            const payments = response[0];
            const invoices = response[1];
            const contracts = response[2];
            const shop = response[3];
            const capturedPayments = filter(payments, (payment: Payment) => payment.status === PAYMENT_STATUS.captured);
            const refundedPayments = filter(payments, (payment: Payment) => payment.status === PAYMENT_STATUS.refunded);
            const capturedPaymentItems = this.getRegistryItems(capturedPayments, invoices);
            const refundedPaymentItems = this.getRegistryItems(refundedPayments, invoices);
            const client = this.getClient(shop, contracts);
            return new Registry(fromTime, toTime, client, capturedPaymentItems, refundedPaymentItems);
        });
    }

    private loadAllData(fn: SearchPaymentsFn | SearchInvoicesFn, context: any, shopID: string, params: SearchParams): Observable<Payment[] | Invoice[]> {
        return Observable.create((observer: Observer<Payment[] | Invoice[]>) => {
            fn.apply(context, [shopID, params]).subscribe((response: any) => {
                let searchData = response.result;
                const countRequests = ceil(response.totalCount / this.limit);
                if (countRequests > 1) {
                    const streamRequests$ = [];
                    for (let i = 1; i < countRequests; i++) {
                        const modified = clone(params);
                        modified.offset = this.limit * i;
                        const request$ = fn.apply(this.searchService, [shopID, modified]);
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

    private getRegistryItems(payments: Payment[], invoices: Invoice[]): RegistryItem[] {
        const registryItems: RegistryItem[] = [];
        payments.forEach((payment: Payment) => {
            const foundInvoice = find(invoices, (invoice: Invoice) => invoice.id === payment.invoiceID);
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
            registryItem.product = foundInvoice.product || '';
            registryItem.description = foundInvoice.description || '';
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
