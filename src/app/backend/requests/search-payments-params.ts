export class SearchPaymentsParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public continuationToken?: string;
    public paymentStatus?: string;
    public paymentFlow?: 'instant' | 'hold';
    public paymentMethod?: 'bankCard' | 'paymentTerminal';
    public paymentTerminalProvider?: 'euroset';
    public invoiceID?: string;
    public paymentID?: string;
    public payerEmail?: string;
    public payerIP?: string;
    public payerFingerprint?: string;
    public customerID?: string;
    public paymentAmount?: number;
    public first6?: string;
    public last4?: string;
    public rrn?: string;
    public bankCardTokenProvider?: 'applepay' | 'googlepay' | 'samsungpay';
}
