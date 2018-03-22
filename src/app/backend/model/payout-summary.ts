export class PayoutSummary {
    public amount: number;
    public fee: number;
    public currency: string;
    public count: number;
    public fromTime: string;
    public toTime: string;
    public type: 'payment' | 'refund';
}
