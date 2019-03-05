import { CreatePayoutParams } from 'koffing/backend';
import * as uuid from 'uuid/v4';
import { toMinor } from 'koffing/common/amount-utils';

export class CreateWalletPayoutService {
    public static getCreatePayoutParams(formValue: any, shopID: string): CreatePayoutParams {
        const params = new CreatePayoutParams();
        params.id = uuid();
        params.shopID = shopID;
        params.payoutToolID = formValue.payoutTool;
        params.amount = toMinor(formValue.amount);
        params.currency = formValue.currency;
        params.metadata = {};
        return params;
    }
}
