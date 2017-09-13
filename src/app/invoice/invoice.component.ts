import { Component, OnInit } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { INVOICE_STATUS } from 'koffing/backend';
import { InvoiceService } from './invoice.service';

@Component({
    templateUrl: 'invoice.component.pug',
    providers: [InvoiceService]
})
export class InvoiceComponent implements OnInit {

    public invoice: Invoice;

    public invoiceNotFound: boolean = false;

    private hasProcessedPayment: boolean = false;

    constructor(private invoiceService: InvoiceService) {
    }

    public ngOnInit() {
        this.invoiceService.invoiceSubject
            .subscribe(
                (invoice: Invoice) => this.invoice = invoice,
                () => this.invoiceNotFound = true);
    }

    public onProcessedPayment(processed: boolean) {
        this.hasProcessedPayment = processed;
    }

    public isPaymentLinkAvailable() {
        return this.invoice && this.invoice.status === INVOICE_STATUS.unpaid && !this.hasProcessedPayment;
    }

    public back() {
        this.invoiceService.back();
    }
}
