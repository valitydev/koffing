import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { isUndefined } from 'lodash';

import { SearchService } from 'koffing/backend/search.service';
import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceSearchResult } from 'koffing/backend';

@Injectable()
export class InvoiceService {
    public invoiceSubject: Subject<Invoice> = new Subject();

    private invoice: Invoice;

    private shopID: string;

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        Observable.combineLatest(this.route.parent.params, this.route.params).subscribe(result => {
            this.shopID = result[0].shopID;
            this.searchInvoice(this.shopID, result[1].invoiceID);
        });
    }

    public back() {
        this.router.navigate(['shop', this.shopID, 'invoices']);
    }

    private searchInvoice(shopID: string, invoiceID: string) {
        const searchRetries = 20;
        this.invoiceSubject.next(undefined);
        this.searchService
            .searchInvoices(shopID, {
                fromTime: moment()
                    .subtract(1, 'year')
                    .startOf('day')
                    .toDate(),
                toTime: moment()
                    .endOf('day')
                    .toDate(),
                limit: 1,
                invoiceID
            })
            .repeatWhen(notifications =>
                notifications.delay(1000).takeWhile((value, retries) => {
                    if (retries === searchRetries) {
                        this.invoiceSubject.error({ message: 'Invoice not found' });
                    }
                    return isUndefined(this.invoice) && retries < searchRetries;
                })
            )
            .subscribe((searchResult: InvoiceSearchResult) => {
                if (searchResult.result && searchResult.result[0]) {
                    this.invoice = searchResult.result[0];
                    this.invoiceSubject.next(this.invoice);
                }
            });
    }
}
