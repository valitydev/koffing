import { CreatePayoutParams } from 'koffing/backend';
import * as uuid from 'uuid/v4';

export class CreateWalletPayoutService {

    public static getCreatePayoutParams(formValue: any, shopID: string): CreatePayoutParams {
        const params = new CreatePayoutParams();
        params.id = uuid();
        params.shopID = shopID;
        params.payoutToolID = formValue.payoutTool;
        params.amount = formValue.amount * 100;
        params.currency = formValue.currency;
        params.metadata = {};
        return params;
    }
}
