import { ShopModification } from './shop-modification';

export class ShopAccountCreation extends ShopModification {

    public currency: string;

    constructor() {
        super();
        this.shopModificationType = 'ShopAccountCreation';
    }
}
