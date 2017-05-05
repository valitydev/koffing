import { PaymentViewItem } from './payment-view-item';

export class SearchResult {
    public isNextAvailable: boolean;
    public totalCount: number;
    public result: PaymentViewItem[];
}
