import { ShopDetail } from './shop-detail.class';
import { Contractor } from './contractor.class';
import { Contract } from './contract.class';

export class Shop {

    public shopID: string;

    public isBlocked: boolean;

    public isSuspended: boolean;

    public categoryRef: number;

    public shopDetails: ShopDetail;

    public contractor: Contractor;

    public contract: Contract;
}
