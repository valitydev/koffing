import { Contractor } from 'koffing/backend/classes/contractor.class';
import { Contract } from 'koffing/backend/classes/contract.class';

export class ContractDecision {
    public contract: Contract;
    public contractor: Contractor;

    constructor(contract?: Contract, contractor?: Contractor) {
        this.contract = contract;
        this.contractor = contractor;
    }
}
