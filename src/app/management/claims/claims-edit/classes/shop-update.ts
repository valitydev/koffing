import { ShopModification } from './shop-modification';
import { ShopParams } from 'koffing/backend/requests/shop-request';

export class ShopUpdate extends ShopModification {

    public details: ShopParams;
}
