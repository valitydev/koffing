import { ShopDetails } from '../model/shop-details';
import * as _ from 'lodash';

export class ShopParams {

    public details: ShopDetails;
    public contractID: number;
    public payoutToolID: number;

    constructor(
        details?: ShopDetails,
        contractID?: number,
        payoutToolID?: number,
    ) {
        this.details = details ? details : new ShopDetails();
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
    }

    public update(params: ShopParams) {
        _.assign(this.details, params.details);
        this.contractID = _.defaultTo(params.contractID, this.contractID);
        this.payoutToolID = _.defaultTo(params.payoutToolID, this.payoutToolID);
    }
}
