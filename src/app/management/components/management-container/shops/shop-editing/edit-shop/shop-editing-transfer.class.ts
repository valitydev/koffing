import { ShopParams } from 'koffing/backend/classes/shop-params.class';

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
