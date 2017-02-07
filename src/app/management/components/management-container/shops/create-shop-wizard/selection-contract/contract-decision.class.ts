import { Contractor } from 'koffing/backend/classes/contractor.class';

export class ContractDecision {
    public contractID: number;
    public contractor: Contractor;

    constructor(contractID?: number, contractor?: Contractor) {
        this.contractID = contractID;
        this.contractor = contractor;
    }
}
