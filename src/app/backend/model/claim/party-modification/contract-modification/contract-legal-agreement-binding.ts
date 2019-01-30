import { ContractModification } from './contract-modification';
import { LegalAgreement } from '../../../contract/legal-agreement';

export class ContractLegalAgreementBinding extends ContractModification {
    public legalAgreement: LegalAgreement;

    constructor() {
        super();
        this.contractModificationType = 'ContractLegalAgreementBinding';
    }
}
