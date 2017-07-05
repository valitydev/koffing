import { Contractor } from './contractor';
import { PayoutToolParams } from './payout-tool-params';

export class ContractParams {
    public contractor: Contractor;
    public payoutToolParams: PayoutToolParams;

    constructor() {
        this.contractor = new Contractor();
        this.payoutToolParams = new PayoutToolParams();
    }
}
