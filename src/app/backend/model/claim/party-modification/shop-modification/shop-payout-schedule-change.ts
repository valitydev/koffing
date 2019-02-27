import { ShopModification } from './shop-modification';

export class ShopPayoutScheduleChange extends ShopModification {
    public scheduleID: string;

    constructor() {
        super();
        this.shopModificationType = 'ShopPayoutScheduleChange';
    }
}
