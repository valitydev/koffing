import { ShopDetail } from './shop-detail.class';
import { CallbackHandler } from './callback-handler';

export class Shop {
    public shopID: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryRef: number;
    public shopDetails: ShopDetail;
    public contractID: number;
    public payoutAccountID: number;
    public callbackHandler: CallbackHandler;
}
