import { Contractor } from './contractor.class';
import { PayoutAccount } from './payout-account.class';

export class Contract {
    public id: number;
    public contractor: Contractor;
    public concludedAt: string;
    public terminatedAt: string;
    public payoutAccouts: PayoutAccount[];
}
