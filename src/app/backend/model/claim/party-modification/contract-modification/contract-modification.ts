import { PartyModification } from '../party-modification';

export abstract class ContractModification extends PartyModification {

    public contractID: string;
    public contractModificationType: string;

    constructor() {
        super();
        this.partyModificationType = 'ContractModification';
    }
}
