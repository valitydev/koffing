import { find } from 'lodash';
import { Shop } from 'koffing/backend/model/shop/shop';

export class ShopIDStorage {

    public static key: string = 'activeShop';

    public static set(shopID: string) {
        localStorage.setItem(this.key, shopID);
    }

    public static get(): string {
        const id = localStorage.getItem('activeShop');
        return id ? id : null;
    }

    public static isAvailable(shops: Shop[]) {
        const id = this.get();
        return id ? !!find(shops, (shop) => id === shop.id) : false;
    }
}
