import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';

export class ShopDetailTransfer {
    public shopDetail: ShopDetail;
    public categoryID: number;
    public callbackUrl: string;
    public valid: boolean;

    constructor(shopDetail: ShopDetail, categoryID: number, callbackUrl: string, valid: boolean) {
        this.shopDetail = shopDetail;
        this.categoryID = categoryID;
        this.callbackUrl = callbackUrl;
        this.valid = valid;
    }
}
