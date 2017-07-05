import { PayoutToolParams } from './payout-tool-params';

export class PayoutTool {
    public id: number;
    public params: PayoutToolParams;

    constructor() {
        this.params = new PayoutToolParams();
    }
}
