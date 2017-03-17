import * as _ from 'lodash';

import { ShopDetails } from './shop-details.class';
import { ShopAccount } from './account.class';
import { CallbackHandler } from './callback-handler.class';
import { ShopParams } from './shop-params.class';

export class Shop {
    public id: number;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public contractID: number;
    public payoutToolID: number;
    public details: ShopDetails;
    public account: ShopAccount;
    public callbackHandler: CallbackHandler;

    constructor() {
        this.details = new ShopDetails();
        this.account = new ShopAccount();
        this.callbackHandler = new CallbackHandler();
    }

    public update(params: ShopParams) {
        this.categoryID = _.defaultTo(params.categoryID, this.categoryID);
        _.assign(this.details, params.details);
        this.contractID = _.defaultTo(params.contractID, this.contractID);
        this.payoutToolID = _.defaultTo(params.payoutToolID, this.payoutToolID);
        this.callbackHandler.url = _.defaultTo(params.callbackUrl, this.callbackHandler.url);
    }
}
