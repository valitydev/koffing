import { ShopLocation } from './shop-location/shop-location';
import { ShopDetails } from './shop-details';
import { ShopAccount } from './shop-account';

export class Shop {
    public id: string;
    public createdAt: string;
    public isBlocked: boolean;
    public isSuspended: boolean;
    public categoryID: number;
    public location: ShopLocation;
    public details: ShopDetails;
    public contractID: string;
    public payoutToolID: string;
    public account: ShopAccount;
}
