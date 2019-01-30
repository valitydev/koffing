import { PartyModification } from '../party-modification';

export abstract class ShopModification extends PartyModification {
    public shopID: string;
    public shopModificationType: string;

    constructor() {
        super();
        this.partyModificationType = 'ShopModification';
    }
}
