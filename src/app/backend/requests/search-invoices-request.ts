export class SearchInvoicesParams {
    public fromTime: Date;
    public toTime: Date;
    public limit?: number;
    public offset?: number;
    public invoiceStatus?: string;
    public paymentStatus?: string;
    public invoiceID?: string;
    public paymentID?: string;
    public payerEmail?: string;
    public payerIP?: string;
    public cardNumberMask?: string;
    public payerFingerprint?: string;
    public paymentAmount?: number;
    public invoiceAmount?: number;
}
