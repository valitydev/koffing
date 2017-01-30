import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { Shop } from 'koffing/backend/backend.module';

export class ShopModificationArgs {
    public contracts: Contract[];
    public contract: Contract;
    public payoutAccount: PayoutAccount;
    public shopFields: Shop;
    public isNewContract: boolean = false;
    public isLoading: boolean = false;
}
