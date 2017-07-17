import { ShopModification } from './shop-modification';
import { ShopLocation } from 'koffing/backend/model/shop/shop-location/shop-location';

export class ShopLocationChange extends ShopModification {

    public location: ShopLocation;

    constructor() {
        super();
        this.shopModificationType = 'ShopLocationChange';
    }
}
