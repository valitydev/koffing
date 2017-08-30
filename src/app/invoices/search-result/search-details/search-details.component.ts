import { Component, Input, OnInit } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { FormSearchParams } from '../../search-form/form-search-params';
import { SearchDetailsService } from './search-details.service';
import { SearchResult } from './search-result';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug',
    providers: [SearchDetailsService]
})
export class SearchDetailsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    @Input()
    public searchParams: FormSearchParams;

    @Input()
    public shopID: string;

    public searchResult: SearchResult;

    public isLoading: boolean;

    constructor(private searchDetailsService: SearchDetailsService) {
    }

    public ngOnInit() {
        this.search();
    }

    public search() {
        this.isLoading = true;
        this.searchDetailsService.search(String(this.invoice.shopID), this.invoice.id, this.searchParams).subscribe((result) => {
            this.isLoading = false;
            this.searchResult = result;
        });
    }

    public isPaymentLinkAvailable() {
        return this.invoice.status === 'unpaid';
    }
}
