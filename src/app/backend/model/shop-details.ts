import { ShopLocation } from './shop-location';

/**
 * @deprecated
 */
export class ShopDetails {
    public name: string;
    public description: string;
    public location: ShopLocation;

    constructor() {
        this.location = new ShopLocation();
    }
}
