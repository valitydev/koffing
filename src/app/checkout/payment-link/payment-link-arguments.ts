export class PaymentLinkArguments {
    public invoiceID?: string;
    public invoiceAccessToken?: string;
    public invoiceTemplateID?: string;
    public invoiceTemplateAccessToken?: string;
    public name?: string;
    public logo?: string;
    public description?: string;
    public payButtonLabel?: string;
    public email?: string;
    public popupMode?: boolean;
    public redirectUrl?: string;
    public applePayTest?: boolean;
    public paymentFlowHold?: boolean;
    public holdExpiration?: string;
    public terminals?: boolean;
    public wallets?: boolean;
}
