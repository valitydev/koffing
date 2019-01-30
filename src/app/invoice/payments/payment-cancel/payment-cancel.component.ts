import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { PAYMENT_STATUS, PaymentStatusChanged } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';

@Component({
    selector: 'kof-payment-cancel',
    templateUrl: './payment-cancel.component.pug'
})
export class PaymentCancelComponent implements AfterViewInit {
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
    ) {}

    public ngAfterViewInit() {
        this.modalElement = jQuery(`#${this.paymentID}cancel`);
    }

    public close() {
        this.modalElement.modal('hide');
    }

    public cancelPayment() {
        this.inProcess = true;
        this.invoiceService
            .cancelPayment(this.invoiceID, this.paymentID, this.reason)
            .subscribe(() => {
                const expectedChange = new PaymentStatusChanged(
                    PAYMENT_STATUS.cancelled,
                    this.paymentID
                );
                this.eventPollerService
                    .startPolling(this.invoiceID, expectedChange)
                    .subscribe(() => {
                        this.inProcess = false;
                        this.onChangeStatus.emit(PAYMENT_STATUS.cancelled);
                        this.close();
                    });
            });
    }
}
