import { PayoutSummary } from './payout-summary';

export class Payout {
    public id: string;
    public amount: number;
    public fee: number;
    public createdAt: string;
    public currency: string;
    public status: string;
    public shopID: string;
    public payoutToolDetails: any;
    public payoutSummary: PayoutSummary;
}
