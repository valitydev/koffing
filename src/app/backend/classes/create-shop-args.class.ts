import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';

export class CreateShopArgs {
    public categoryID: number;
    public details: ShopDetail;
    public contractID: number;
    public payoutToolID: number;
    public callbackUrl: string;
}
