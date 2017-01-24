import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { Shop } from 'koffing/backend/backend.module';

export class WizardArgs {
    public contracts: Contract[];
    public contract: Contract;
    public payoutAccount: PayoutAccount;
    public shopFields: Shop;
    public isNewContract: boolean;
    public isLoading: boolean;
}
