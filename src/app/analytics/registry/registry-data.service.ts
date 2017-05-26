import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { ShopService } from 'koffing/backend/services/shop.service';
import { ContractService } from 'koffing/backend/services/contract.service';
import { SearchService } from 'koffing/backend/search.service';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';
import { Registry } from './registry';
import { RegistryItem } from './registry-item';

@Injectable()
export class RegistryDataService {

    private limit: number = 1000;

    constructor(
        private searchService: SearchService,
        private contractService: ContractService,
        private shopService: ShopService
    ) { }

    public getRegistry(shopID: string, fromTime: Date, toTime: Date): Observable<Registry> {
        return Observable.create((observer: Observer<Registry>) => {
            const searchParams = this.toSearchParams(fromTime, toTime);
            const observablePayments = this.searchService.searchPayments(shopID, searchParams);
            const observableInvoices = this.searchService.searchInvoices(shopID, searchParams);
            const observableContracts = this.contractService.getContractsObservable();
            const observableShop = this.shopService.getShopObservable(shopID);
            Observable.forkJoin([observablePayments, observableInvoices, observableContracts, observableShop]).subscribe((response) => {
                const payments = response[0].result;
                const invoices = response[1].result;
                const contracts = response[2];
                const shop = response[3];
                const successPayments = _.filter(payments, (payment: Payment) => payment.status === 'captured');
                const registryItems = this.getRegistryItems(successPayments, invoices);
                const client = this.getClient(shop, contracts);
                observer.next(new Registry(registryItems, fromTime, toTime, client));
                observer.complete();
            });
        });
    }

    private getRegistryItems(payments: Payment[], invoices: Invoice[]): RegistryItem[] {
        const registryItems: RegistryItem[] = [];
        _.forEach(payments, (payment: Payment) => {
            const foundInvoice = _.find(invoices, (invoice: Invoice) => invoice.id === payment.invoiceID);
            const registryItem = new RegistryItem();
            registryItem.invoiceID = `${payment.invoiceID}.${payment.id}`;
            registryItem.paymentDate = payment.createdAt;
            registryItem.amount = payment.amount;
            registryItem.fee = payment.fee;
            registryItem.product = foundInvoice.product;
            registryItem.description = foundInvoice.description;
            registryItems.push(registryItem);
        });
        return registryItems;
    }

    private getClient(shop: Shop, contracts: Contract[]): string {
        let client = '';
        const activeContract = _.find(contracts, (contract: Contract) => contract.id === shop.contractID);
        if (activeContract.contractor && activeContract.contractor.legalEntity) {
            const russianLegalEntity = activeContract.contractor.legalEntity as RussianLegalEntity;
            client = russianLegalEntity.registeredName;
        }
        return client;
    }

    private toSearchParams(fromTime: Date, toTime: Date): SearchPaymentsParams {
        const searchParams = new SearchPaymentsParams();
        searchParams.fromTime = fromTime;
        searchParams.toTime = toTime;
        searchParams.limit = this.limit;
        return searchParams;
    }
}
