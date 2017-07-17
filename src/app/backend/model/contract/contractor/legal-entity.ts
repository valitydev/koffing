import { Contractor } from './contractor';

export abstract class LegalEntity extends Contractor {

    public entityType: string;

    constructor() {
        super();
        this.contractorType = 'LegalEntity';
    }
}
