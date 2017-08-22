import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { Invoice } from 'koffing/backend/model/invoice';
import { SearchService } from 'koffing/backend/search.service';
import { InvoiceFormService } from 'koffing/invoices/invoice-form/invoice-form.service';
import { InvoiceTemplateFormService } from 'koffing/invoices/invoice-template-form/invoice-template-form.service';
import { CheckoutConfigFormService } from 'koffing/invoices/checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from 'koffing/invoices/payment-link/payment-link.service';
import { FormSearchParams } from 'koffing/invoices/search-form/form-search-params';
import { InvoicesService } from 'koffing/invoices/invoices.service';

@Component({
    templateUrl: './invoices.component.pug',
    styleUrls: ['invoices.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        InvoiceFormService,
        InvoiceTemplateFormService,
        CheckoutConfigFormService,
        PaymentLinkService
    ]
})
export class InvoicesComponent implements OnInit {

    public invoices: Subject<Invoice[]> = new Subject();
    public isLoading: boolean = false;
    public isSearchAction: boolean = false;
    public shopID: string;
    public totalCount: number;
    public offset: number = 0;
    public limit: number = 20;
    public searchParams: FormSearchParams = {
        from: moment().subtract(1, 'month').startOf('day').toDate(),
        to: moment().endOf('day').toDate()
    };

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public onSearch(searchParams: FormSearchParams) {
        this.searchParams = searchParams;
        this.offset = 0;
        this.search();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.search();
    }

    public onCreate(invoice: Invoice) {
        this.searchParams.invoiceID = invoice.id;
        this.totalCount = 1;
        this.invoices.next([invoice]);
        this.isSearchAction = true;
    }

    private search() {
        this.isLoading = true;
        const request = InvoicesService.toSearchParams(this.limit, this.offset, this.searchParams);
        this.searchService.searchInvoices(this.shopID, request).subscribe((response) => {
            this.isLoading = false;
            this.totalCount = response.totalCount;
            this.invoices.next(response.result);
            this.isSearchAction = true;
        });
    }
}
