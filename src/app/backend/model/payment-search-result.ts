import { Payment } from './payment/payment';

export class PaymentSearchResult {
    public continuationToken?: string;
    public result: Payment[];
}
