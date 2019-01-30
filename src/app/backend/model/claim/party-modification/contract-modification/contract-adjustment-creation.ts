import { ContractModification } from './contract-modification';

export class ContractAdjustmentCreation extends ContractModification {
    public adjustmentID: string;

    constructor() {
        super();
        this.contractModificationType = 'ContractAdjustmentCreation';
    }
}
