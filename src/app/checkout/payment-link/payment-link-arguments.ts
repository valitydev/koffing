export class PaymentLinkArguments {
    public invoiceID?: string;
    public invoiceAccessToken?: string;
    public invoiceTemplateID?: string;
    public invoiceTemplateAccessToken?: string;
    public name?: string;
    public description?: string;
    public email?: string;
    public redirectUrl?: string;
    public paymentFlowHold?: boolean;
    public holdExpiration?: string;
    public terminals?: boolean;
    public wallets?: boolean;
    public bankCard?: boolean;
}
