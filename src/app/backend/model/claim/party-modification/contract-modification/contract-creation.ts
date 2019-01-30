import { ContractModification } from './contract-modification';
import { Contractor } from '../../../contract/contractor/contractor';

export class ContractCreation extends ContractModification {
    public contractor: Contractor;
    public paymentInstitutionID: number;

    constructor(contractID: string, contractor: Contractor, paymentInstitutionID: number) {
        super();
        this.contractModificationType = 'ContractCreation';
        this.contractID = contractID;
        this.contractor = contractor;
        this.paymentInstitutionID = paymentInstitutionID;
    }
}
