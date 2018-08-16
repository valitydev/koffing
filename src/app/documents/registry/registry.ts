import { PaymentRegistryItem } from './payment-registry-item';
import { RefundRegistryItem } from './refund-registry-item';

export class Registry {
    public fromTime: Date;
    public toTime: Date;
    public client: string;
    public capturedPaymentItems: PaymentRegistryItem[];
    public refundedPaymentItems: RefundRegistryItem[];

    constructor(fromTime?: Date, toTime?: Date, client?: string, capturedPaymentItems?: PaymentRegistryItem[], refundedPaymentItems?: RefundRegistryItem[]) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.client = client;
        this.capturedPaymentItems = capturedPaymentItems;
        this.refundedPaymentItems = refundedPaymentItems;
    }
}
