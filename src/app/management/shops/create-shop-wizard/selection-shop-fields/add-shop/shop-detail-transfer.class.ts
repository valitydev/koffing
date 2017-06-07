import { ShopDetails } from 'koffing/backend/backend.module';

export class ShopDetailTransfer {
    public shopDetail: ShopDetails;
    public valid: boolean;

    constructor(shopDetail: ShopDetails, valid: boolean) {
        this.shopDetail = shopDetail;
        this.valid = valid;
    }
}
