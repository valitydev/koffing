import { Payment } from 'koffing/backend/model/payment';
import { SearchType } from './search-type';

export class PaymentViewItem {
    public payment: Payment;
    public searchType: SearchType;
}
