import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { find } from 'lodash';

import { INVOICE_STATUS } from 'koffing/backend/constants/invoice-status';
import { PAYMENT_STATUS } from 'koffing/backend/constants/payment-status';
import { Invoice } from 'koffing/backend/model/invoice';
import { SearchDetailsService } from './search-details.service';
import { SearchResult } from './search-result';
import { SearchFormService } from 'koffing/invoices/search-form/search-form.service';
import { Payment } from 'koffing/backend/model/payment';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug',
    providers: [SearchDetailsService]
})
export class SearchDetailsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    public searchResult: SearchResult;

    public isLoading: boolean;

    public searchForm: FormGroup;

    private paymentInStatusProcessed: boolean;

    constructor(private searchDetailsService: SearchDetailsService,
                private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.search();
    }

    public search() {
        this.isLoading = true;
        this.searchDetailsService.search(this.invoice.shopID, this.invoice.id, this.searchForm.value).subscribe((result) => {
            this.isLoading = false;
            this.searchResult = result;
            this.paymentInStatusProcessed = Boolean(this.findPaymentInStatusProcessed(result.payments));
        });
    }

    public isPaymentLinkAvailable() {
        return (this.invoice.status === INVOICE_STATUS.unpaid && !this.paymentInStatusProcessed && !this.isLoading);
    }

    private findPaymentInStatusProcessed(payments: Payment[]): Payment {
        return find(payments, { status: PAYMENT_STATUS.processed });
    }
}
