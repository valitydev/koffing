import { Contractor } from './contractor';
import {LegalEntityTypeEnum} from './legal-entity-type-enum';

export abstract class LegalEntity extends Contractor {

    public entityType: LegalEntityTypeEnum;

    constructor() {
        super();
        this.contractorType = 'LegalEntity';
    }
}
