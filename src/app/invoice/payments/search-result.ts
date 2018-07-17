import { Payment } from 'koffing/backend/model/payment/payment';

export class SearchResult {
    public isNextAvailable: boolean;
    public payments: Payment[] = [];
}
