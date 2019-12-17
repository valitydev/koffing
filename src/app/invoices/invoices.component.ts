import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { Invoice } from 'koffing/backend/model/invoice';
import { SearchService } from 'koffing/backend/search.service';
import { InvoiceFormService } from 'koffing/invoices/invoice-form/invoice-form.service';
import { InvoiceTemplateFormService } from 'koffing/invoices/invoice-template-form/invoice-template-form.service';
import { InvoicesService } from 'koffing/invoices/invoices.service';
import { SearchFormService } from 'koffing/invoices/search-form/search-form.service';
import { Shop } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';

@Component({
    templateUrl: 'invoices.component.pug',
    styleUrls: ['invoices.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [InvoicesService, InvoiceFormService, InvoiceTemplateFormService, SearchFormService]
})
export class InvoicesComponent implements OnInit {
    public invoices: Subject<Invoice[]> = new Subject();
    public shop: Shop;
    public page: number = 0;
    public limit: number = 20;
    private continuationTokens: string[] = [];
    private searchForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private invoicesService: InvoicesService,
        private searchFormService: SearchFormService,
        private shopService: ShopService
    ) {}

    public ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.route.parent.params
            .switchMap(params => this.shopService.getShopByID(params['shopID']))
            .subscribe(shop => {
                this.shop = shop;
                this.search();
            });
    }

    public hasNext() {
        return !!this.continuationTokens[this.page + 1];
    }

    public reset() {
        this.continuationTokens = [];
        this.page = 0;
    }

    public onSearch() {
        this.reset();
        this.search();
    }

    public onChangePage(num: number) {
        this.search(num);
    }

    public onCreate(invoice: Invoice) {
        this.router.navigate(['shop', this.shop.id, 'invoice', invoice.id]);
    }

    private search(num: number = 0) {
        this.page += num;
        const continuationToken = this.continuationTokens[this.page];
        const request = this.invoicesService.toSearchParams(
            this.limit,
            continuationToken,
            this.searchForm.value
        );
        this.searchService.searchInvoices(this.shop.id, request).subscribe(response => {
            this.continuationTokens[this.page + 1] = response.continuationToken;
            this.invoices.next(response.result);
        });
    }
}
