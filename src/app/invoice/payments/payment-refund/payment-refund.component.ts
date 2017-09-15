import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { PAYMENT_STATUS, PaymentStatusChanged } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';

@Component({
    selector: 'kof-payment-refund',
    templateUrl: 'payment-refund.component.pug'
})
export class PaymentRefundComponent implements AfterViewInit {

    @Input()
    public invoiceID: string;

    @Input()
    public paymentID: string;

    @Output()
    public onChangeStatus: EventEmitter<string> = new EventEmitter();

    public reason: string;
    public inProcess: boolean = false;
    private modalElement: any;

    constructor(
        private eventPollerService: EventPollerService,
        private invoiceService: InvoiceService
    ) { }

    public ngAfterViewInit() {
        this.modalElement = jQuery(`#${this.paymentID}refund`);
    }

    public close() {
        this.modalElement.modal('hide');
    }

    public refundPayment() {
        this.inProcess = true;
        this.invoiceService.refundPayment(this.invoiceID, this.paymentID, this.reason).subscribe(() => {
            const expectedChange = new PaymentStatusChanged(PAYMENT_STATUS.refunded, this.paymentID);
            this.eventPollerService.startPolling(this.invoiceID, expectedChange).subscribe(() => {
                this.inProcess = false;
                this.onChangeStatus.emit(PAYMENT_STATUS.refunded);
                this.close();
            });
        });
    }
}
