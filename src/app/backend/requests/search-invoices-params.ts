export class SearchInvoicesParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public continuationToken?: string;
    public invoiceID?: string;
    public invoiceAmount?: number;
    public invoiceStatus?: string;
    public paymentID?: string;
    public paymentAmount?: number;
    public paymentStatus?: string;
    public paymentMethod?: 'bankCard' | 'bankTerminal';
    public paymentFlow?: 'instant' | 'hold';
    public paymentTerminalProvider?: 'euroset';
    public payerIP?: string;
    public payerEmail?: string;
    public payerFingerprint?: string;
    public customerID?: string;
    public first6?: string;
    public last4?: string;
    public bankCardTokenProvider?: 'applepay' | 'googlepay' | 'samsungpay';
}
