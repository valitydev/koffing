import { PayoutToolParams } from './payout-tool-params';

/**
 * @deprecated Use koffing/backend/model/payout-tool/payout-tool
 */
export class PayoutTool {
    public id: number;
    public params: PayoutToolParams;

    constructor() {
        this.params = new PayoutToolParams();
    }
}
