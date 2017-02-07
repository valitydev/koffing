import { ShopDetail } from './shop-detail.class';
import { Account } from './account.class';
import { CallbackHandler } from './callback-handler.class';

export class Shop {
    public id: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public contractID: number;
    public payoutToolID: number;
    public details: ShopDetail;
    public account: Account;
    public callbackHandler: CallbackHandler;

    constructor() {
        this.details = new ShopDetail();
        this.account = new Account();
        this.callbackHandler = new CallbackHandler();
    }
}
