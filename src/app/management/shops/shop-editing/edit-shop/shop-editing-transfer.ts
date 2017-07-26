import { ShopParams } from 'koffing/backend/requests/shop-params';

export class ShopEditingTransfer {
    public shopEditing: ShopParams;
    public valid: boolean;
    public dirty: boolean;

    constructor(shopEditing: ShopParams, valid: boolean, dirty: boolean) {
        this.shopEditing = shopEditing;
        this.valid = valid;
        this.dirty = dirty;
    }
}
