import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopEditingParams } from 'koffing/management/components/management-container/claims-edit/shop-editing-params.class';

export class ClaimData {

    public claimID: number;
    public payoutToolParams: PayoutToolParams;
    public payoutToolContractId: number;
    public contractor: Contractor;
    public shop: Shop;
    public shopEditingParams: ShopEditingParams;
}
