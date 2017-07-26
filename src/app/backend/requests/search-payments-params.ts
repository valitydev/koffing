export class SearchPaymentsParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;
    public paymentStatus?: string;
    public invoiceID?: string;
    public invoiceTemplateID?: string;
    public paymentID?: string;
    public payerEmail?: string;
    public payerIP?: string;
    public cardNumberMask?: string;
    public payerFingerprint?: string;
    public paymentAmount?: number;
}
