import { ShopModification } from './shop-modification';

export class ShopCategoryChange extends ShopModification {
    public categoryID: number;

    constructor() {
        super();
        this.shopModificationType = 'ShopCategoryChange';
    }
}
