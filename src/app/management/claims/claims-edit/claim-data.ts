import { PayoutToolParams } from 'koffing/backend/model/payout-tool-params';
import { Contractor } from 'koffing/backend/model/contractor';
import { Shop } from 'koffing/backend/model/shop';
import { ShopEditingParams } from './shop-editing-params';

export class ClaimData {

    public claimID: number;
    public payoutToolParams: PayoutToolParams;
    public payoutToolContractId: number;
    public contractor: Contractor;
    public shop: Shop;
    public shopEditingParams: ShopEditingParams;
}
