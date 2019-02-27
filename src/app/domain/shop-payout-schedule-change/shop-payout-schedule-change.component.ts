import { Component, Input } from '@angular/core';

import { ShopPayoutScheduleChange } from 'koffing/backend';

@Component({
    selector: 'kof-shop-payout-schedule-change',
    templateUrl: 'shop-payout-schedule-change.component.pug'
})
export class ShopPayoutScheduleChangeComponent {
    @Input()
    public scheduleChange: ShopPayoutScheduleChange;
}
