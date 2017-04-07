import { ShopDetails } from 'koffing/backend/backend.module';

export class ShopDetailTransfer {
    public shopDetail: ShopDetails;
    public categoryID: number;
    public callbackUrl: string;
    public valid: boolean;

    constructor(shopDetail: ShopDetails, categoryID: number, callbackUrl: string, valid: boolean) {
        this.shopDetail = shopDetail;
        this.categoryID = categoryID;
        this.callbackUrl = callbackUrl;
        this.valid = valid;
    }
}
