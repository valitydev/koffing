import { ShopDetail } from './shop-detail.class';

export class Shop {
    public shopID: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryRef: number;
    public shopDetails: ShopDetail;
    public contractID: number;
    public payoutAccountID: number;
}
