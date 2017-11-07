import { RegistryItem } from './registry-item';

export class Registry {
    public fromTime: Date;
    public toTime: Date;
    public client: string;
    public capturedPaymentItems: RegistryItem[];
    public refundedPaymentItems: RegistryItem[];

    constructor(fromTime?: Date, toTime?: Date, client?: string, capturedPaymentItems?: RegistryItem[], refundedPaymentItems?: RegistryItem[]) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.client = client;
        this.capturedPaymentItems = capturedPaymentItems;
        this.refundedPaymentItems = refundedPaymentItems;
    }
}
