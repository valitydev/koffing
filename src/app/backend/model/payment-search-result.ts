import { Payment } from 'koffing/backend/model/payment';

export class PaymentSearchResult {
    public totalCount: number;
    public result: Payment[];
}
