import { Component, Input, OnInit } from '@angular/core';
import { find } from 'lodash';

import { INVOICE_STATUS } from 'koffing/backend/constants/invoice-status';
import { PAYMENT_STATUS } from 'koffing/backend/constants/payment-status';
import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment';
import { SearchDetailsService } from 'koffing/invoices/search-result/search-details/search-details.service';
import { FormSearchParams } from 'koffing/invoices/search-form/form-search-params';
import { SearchResult } from 'koffing/invoices/search-result/search-details/search-result';

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
    private paymentInStatusProcessed: boolean;

    constructor(private searchDetailsService: SearchDetailsService) { }

    public ngOnInit() {
        this.search();
    }

    public search() {
        this.isLoading = true;
        this.searchDetailsService.search(String(this.invoice.shopID), this.invoice.id, this.searchParams).subscribe((result) => {
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
