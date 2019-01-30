import { ShopModification } from './shop-modification';

export class ShopContractBinding extends ShopModification {
    public contractID: string;
    public payoutToolID: string;

    constructor(shopID: string, contractID: string, payoutToolID: string) {
        super();
        this.shopModificationType = 'ShopContractBinding';
        this.shopID = shopID;
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
    }
}
