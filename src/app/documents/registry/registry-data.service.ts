import { Injectable } from '@angular/core';
import { filter, forEach, find } from 'lodash';
import { Observable, Observer } from 'rxjs';

import { PAYMENT_STATUS } from 'koffing/backend/constants/payment-status';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { SearchService } from 'koffing/backend/search.service';
import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment/payment';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-params';
import { Registry } from './registry';
import { RegistryItem } from './registry-item';
import { Shop } from 'koffing/backend/model/shop/shop';
import { Contract } from 'koffing/backend/model/contract/contract';
import { RussianLegalEntity } from 'koffing/backend/model/contract/contractor/russian-legal-entity';
import { PaymentResourcePayer } from 'koffing/backend/model/payer/payment-resource-payer';
import { SearchInvoicesParams } from 'koffing/backend/requests/search-invoices-params';

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
            const observablePayments = this.searchService.searchPayments(shopID, searchParams as SearchPaymentsParams);
            const observableInvoices = this.searchService.searchInvoices(shopID, searchParams as SearchInvoicesParams);
            const observableContracts = this.contractService.getContracts();
            const observableShop = this.shopService.getShopByID(shopID);
            Observable.forkJoin([observablePayments, observableInvoices, observableContracts, observableShop]).subscribe((response) => {
                const payments = response[0].result;
                const invoices = response[1].result;
                const contracts = response[2];
                const shop = response[3];
                const successPayments = filter(payments, (payment: Payment) => payment.status === PAYMENT_STATUS.captured);
                const registryItems = this.getRegistryItems(successPayments, invoices);
                const client = this.getClient(shop, contracts);
                observer.next(new Registry(registryItems, fromTime, toTime, client));
                observer.complete();
            });
        });
    }

    private getRegistryItems(payments: Payment[], invoices: Invoice[]): RegistryItem[] {
        const registryItems: RegistryItem[] = [];
        forEach(payments, (payment: Payment) => {
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
            registryItem.product = foundInvoice.product;
            registryItem.description = foundInvoice.description;
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

    private toSearchParams(fromTime: Date, toTime: Date): SearchPaymentsParams | SearchInvoicesParams {
        const searchParams = new SearchPaymentsParams();
        searchParams.fromTime = fromTime;
        searchParams.toTime = toTime;
        searchParams.limit = this.limit;
        return searchParams;
    }
}
