import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { Invoice, PaymentRefund, RefundParams } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { PaymentRefundService } from './payment-refund.service';
import { RefundStatusChanged } from 'koffing/backend/model/event/refund-status.changed';
import { REFUND_STATUS } from 'koffing/backend/constants/refund-status';
import { ShopService } from 'koffing/backend/shop.service';
import { AccountsService } from 'koffing/backend/accounts.service';
import { Account } from 'koffing/backend/model';

@Component({
    selector: 'kof-payment-refund',
    templateUrl: 'payment-refund.component.pug',
    styleUrls: ['payment-refund.component.less']
})
export class PaymentRefundComponent implements OnInit, OnChanges, AfterViewInit {

    @Input()
    public invoice: Invoice;

    @Input()
    public paymentID: string;

    @Input()
    public refunds: PaymentRefund[];

    @Output()
    public onRefund: EventEmitter<void> = new EventEmitter();

    public form: FormGroup;

    public inProcess: boolean = false;
    private modalElement: any;
    private refundedAmount: number = 0;
    private account: Account;
    private settlementID: number;

    constructor(private eventPollerService: EventPollerService,
                private invoiceService: InvoiceService,
                private paymentRefundService: PaymentRefundService,
                private route: ActivatedRoute,
                private shopService: ShopService,
                private accountService: AccountsService) {
    }

    public ngOnInit() {
        this.form = this.paymentRefundService.initForm(this.invoice.amount);
        this.route.parent.params.switchMap((params) =>
            this.shopService.getShopByID(params.shopID)).subscribe((shop) => {
            this.settlementID = shop.account.settlementID;
            this.setAccount();
        });
    }

    public ngOnChanges() {
        if (this.settlementID) {
            this.setAccount();
        }
        if (this.refunds) {
            this.refundedAmount = this.refunds.reduce((acc, current) => acc + current.amount, 0);
        }
    }

    public ngAfterViewInit() {
        this.modalElement = jQuery(`#${this.paymentID}refund`);
    }

    public open() {
        this.form = this.paymentRefundService.initForm(this.invoice.amount - this.refundedAmount, this.account.availableAmount);
    }

    public close() {
        this.modalElement.modal('hide');
    }

    public refundPayment() {
        this.inProcess = true;
        const refundParams = {
            reason: this.form.value.reason || '',
            amount: this.form.value.amount * 100,
            currency: this.account.currency
        } as RefundParams;
        this.invoiceService.refundPayment(this.invoice.id, this.paymentID, refundParams).subscribe((refund) => {
            const expectedChange = new RefundStatusChanged(REFUND_STATUS.succeeded, this.paymentID, refund.id);
            this.eventPollerService.startPolling(this.invoice.id, expectedChange).subscribe(() => {
                this.inProcess = false;
                this.onRefund.emit();
                this.close();
            });
        });
    }

    private setAccount() {
        this.accountService.getAccountByID(this.settlementID).subscribe((account) => this.account = account);
    }
}
