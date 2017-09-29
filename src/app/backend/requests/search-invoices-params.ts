export class SearchInvoicesParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;
    public invoiceID?: string;
    public invoiceAmount?: number;
    public invoiceStatus?: string;
    public invoiceTemplateID?: string;
    public paymentID?: string;
    public paymentAmount?: number;
    public paymentStatus?: string;
    public paymentMethod?: string;
    public paymentFlow?: string;
    public payerIP?: string;
    public payerEmail?: string;
    public payerFingerprint?: string;
    public cardNumberMask?: string;
}
