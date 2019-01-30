import { ShopLocation } from './shop-location';

export class ShopLocationUrl extends ShopLocation {
    public url: string;

    constructor(url: string) {
        super();
        this.locationType = 'ShopLocationUrl';
        this.url = url;
    }
}
