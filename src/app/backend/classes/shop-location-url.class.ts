import { ShopLocation } from 'koffing/backend/classes/shop-location.class';

export class ShopLocationUrl extends ShopLocation {

    public url: string;

    constructor() {
        super();
        this.locationType = 'ShopLocationUrl';
    }
}
