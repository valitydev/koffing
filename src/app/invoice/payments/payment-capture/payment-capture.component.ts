import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { PAYMENT_STATUS, PaymentStatusChanged } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { toDisplayAmount } from 'koffing/common/amount-utils';

@Component({
    selector: 'kof-payment-capture',
    templateUrl: './payment-capture.component.pug'
})
export class PaymentCaptureComponent implements OnInit, AfterViewInit {
    @Input()
    public invoiceID: string;

    @Input()
    public paymentID: string;

    @Input()
    public inputAmount: number;

    @Output()
    public onChangeStatus: EventEmitter<string> = new EventEmitter();

    public form: FormGroup;

    public inProcess: boolean = false;

    private modalElement: any;

    constructor(
        private eventPollerService: EventPollerService,
        private invoiceService: InvoiceService,
        private fb: FormBuilder
    ) {}

    public ngOnInit() {
        const amount = toDisplayAmount(this.inputAmount);
        this.form = this.fb.group({
            amount: this.fb.control(amount, [
                Validators.required,
                Validators.max(amount),
                Validators.min(0)
            ]),
            reason: this.fb.control('', [Validators.required])
        });
    }

    public ngAfterViewInit() {
        this.modalElement = jQuery(`#${this.paymentID}capture`);
    }

    public close() {
        this.modalElement.modal('hide');
    }

    public capturePayment() {
        this.inProcess = true;
        this.invoiceService
            .capturePayment(
                this.invoiceID,
                this.paymentID,
                this.form.value.reason,
                this.form.value.amount
            )
            .subscribe(() => {
                const expectedChange = new PaymentStatusChanged(
                    PAYMENT_STATUS.captured,
                    this.paymentID
                );
                this.eventPollerService
                    .startPolling(this.invoiceID, expectedChange)
                    .subscribe(() => {
                        this.inProcess = false;
                        this.onChangeStatus.emit(PAYMENT_STATUS.captured);
                        this.close();
                    });
            });
    }
}
