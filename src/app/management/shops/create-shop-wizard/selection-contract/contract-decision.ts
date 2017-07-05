import { Contractor } from 'koffing/backend/model/contractor';
import { Contract } from 'koffing/backend/model/contract';

export class ContractDecision {
    public contract: Contract;
    public contractor: Contractor;

    constructor(contract?: Contract, contractor?: Contractor) {
        this.contract = contract;
        this.contractor = contractor;
    }
}
