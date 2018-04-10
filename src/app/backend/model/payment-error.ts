export class PaymentError {
    public code: string;
    public subError?: PaymentError;
}
