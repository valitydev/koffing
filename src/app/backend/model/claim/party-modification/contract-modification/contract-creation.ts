import { ContractModification } from './contract-modification';
import { Contractor } from '../../../contract/contractor/contractor';

export class ContractCreation extends ContractModification {

    public contractor: Contractor;

    constructor(contractID: string, contractor: Contractor) {
        super();
        this.contractModificationType = 'ContractCreation';
        this.contractID = contractID;
        this.contractor = contractor;
    }
}
