import { Component, Input } from '@angular/core';

import { ShopLocationChange } from 'koffing/backend';

@Component({
    selector: 'kof-shop-location-change',
    templateUrl: 'shop-location-change.component.pug'
})
export class ShopLocationChangeComponent {
    @Input()
    public locationChange: ShopLocationChange;
}
