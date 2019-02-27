import { Component, Input } from '@angular/core';

import { ShopDetailsChange } from 'koffing/backend';

@Component({
    selector: 'kof-shop-details-change',
    templateUrl: 'shop-details-change.component.pug'
})
export class ShopDetailsChangeComponent {
    @Input()
    public detailsChange: ShopDetailsChange;
}
