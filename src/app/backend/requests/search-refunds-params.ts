export class SearchRefundsParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;
    public invoiceID?: number;
    public paymentID?: number;
    public refundID?: number;
    public refundStatus?: 'pending' | 'succeeded' | 'failed';
}
