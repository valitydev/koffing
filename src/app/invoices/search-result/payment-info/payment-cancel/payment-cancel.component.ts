import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { PAYMENT_STATUS, PaymentStatusChanged } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';

@Component({
    selector: 'kof-payment-cancel',
    templateUrl: './payment-cancel.component.pug'
})
export class PaymentCancelComponent {

    @Input()
    public invoiceID: string;

    @Input()
    public paymentID: string;

    @Output()
    public onChangeStatus: EventEmitter<string> = new EventEmitter();

    @Output()
    public inProgressPolling: EventEmitter<boolean> = new EventEmitter();

    public reason: string;

    constructor(
        private eventPollerService: EventPollerService,
        private invoiceService: InvoiceService
    ) { }
    
    public cancelPayment() {
        this.inProgressPolling.emit(true);
        this.invoiceService.cancelPayment(this.invoiceID, this.paymentID, this.reason).subscribe(() => {
            const expectedChange = new PaymentStatusChanged(PAYMENT_STATUS.cancelled, this.paymentID);
            this.eventPollerService.startPolling(this.invoiceID, expectedChange).subscribe(() => {
                this.onChangeStatus.emit(PAYMENT_STATUS.cancelled);
            });
        });
    }
}
