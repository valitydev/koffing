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

@Component({
    templateUrl: 'invoices.component.pug',
    styleUrls: ['invoices.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        InvoicesService,
        InvoiceFormService,
        InvoiceTemplateFormService,
        SearchFormService
    ]
})
export class InvoicesComponent implements OnInit {

    public invoices: Subject<Invoice[]> = new Subject();
    public shopID: string;
    public totalCount: number;
    public offset: number = 0;
    public limit: number = 20;
    private searchForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private searchService: SearchService,
                private invoicesService: InvoicesService,
                private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public onSearch() {
        this.offset = 0;
        this.search();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.search();
    }

    public onCreate(invoice: Invoice) {
        this.router.navigate(['shop', this.shopID, 'invoice', invoice.id]);
    }

    private search() {
        const request = this.invoicesService.toSearchParams(this.limit, this.offset, this.searchForm.value);
        this.searchService.searchInvoices(this.shopID, request).subscribe((response) => {
            this.totalCount = response.totalCount;
            this.invoices.next(response.result);
        });
    }
}
