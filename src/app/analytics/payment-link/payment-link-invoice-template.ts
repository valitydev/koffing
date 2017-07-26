export class PaymentLinkInvoiceTemplate {
    public invoiceTemplateID: string;
    public invoiceTemplateAccessToken: string;

    constructor(invoiceTemplateID: string, invoiceTemplateAccessToken: string) {
        this.invoiceTemplateID = invoiceTemplateID;
        this.invoiceTemplateAccessToken = invoiceTemplateAccessToken;
    }
}
