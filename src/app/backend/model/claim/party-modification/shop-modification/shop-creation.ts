import { ShopModification } from './shop-modification';
import { ShopLocation } from '../../../shop/shop-location/shop-location';
import { ShopDetails } from '../../../shop/shop-details';

export class ShopCreation extends ShopModification {

    public location: ShopLocation;
    public details: ShopDetails;
    public contractID: string;
    public payoutToolID: string;

    constructor(options: {
        shopID: string,
        location: ShopLocation,
        details: ShopDetails,
        contractID: string,
        payoutToolID: string
    }) {
        super();
        this.shopModificationType = 'ShopCreation';
        this.shopID = options.shopID;
        this.location = options.location;
        this.details = options.details;
        this.contractID = options.contractID;
        this.payoutToolID = options.payoutToolID;
    }
}
