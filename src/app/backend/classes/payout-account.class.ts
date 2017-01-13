import { PayoutTool } from './payout-tool.class';

export class PayoutAccount {
    public id: number;
    public currency: string;
    public tool: PayoutTool;
}
