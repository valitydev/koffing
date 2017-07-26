import { ShopModification } from './shop-modification';
import { ShopParams } from 'koffing/backend/requests/shop-params';

export class ShopUpdate extends ShopModification {

    public details: ShopParams;
}
