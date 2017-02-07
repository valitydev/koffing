import { LegalEntity } from './legal-entity.class';

export class RussianLegalEntity extends LegalEntity {
    public registeredName: string;
    public registeredNumber: string;
    public inn: string;
    public actualAddress: string;
    public postAddress: string;
    public representativePosition: string;
    public representativeFullName: string;
    public representativeDocument: string;

    constructor() {
        super();
        this.entityType = 'RussianLegalEntity';
    }
}
