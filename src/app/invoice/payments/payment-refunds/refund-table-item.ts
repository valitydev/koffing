import { PaymentRefund } from 'koffing/backend';

export class RefundTableItem {
    public visible: boolean = false;
    public refund: PaymentRefund;

    constructor(refund: PaymentRefund, visible?: boolean) {
        this.refund = refund;
        this.visible = visible;
    }
}
