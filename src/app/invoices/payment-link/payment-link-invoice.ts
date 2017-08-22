export class PaymentLinkInvoice {
    public invoiceID: string;
    public invoiceAccessToken: string;

    constructor(invoiceID: string, invoiceAccessToken: string) {
        this.invoiceID = invoiceID;
        this.invoiceAccessToken = invoiceAccessToken;
    }
}
