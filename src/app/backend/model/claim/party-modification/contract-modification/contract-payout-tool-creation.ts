import { ContractModification } from './contract-modification';
import { PayoutToolDetails } from '../../../payout-tool/payout-tool-details/payout-tool-details';

export class ContractPayoutToolCreation extends ContractModification {

    public payoutToolID: string;
    public currency: string;
    public details: PayoutToolDetails;

    constructor(contractID: string, payoutToolID: string, details: PayoutToolDetails) {
        super();
        this.currency = 'RUB';
        this.contractModificationType = 'ContractPayoutToolCreation';
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
        this.details = details;
    }
}
