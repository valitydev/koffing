import { Component, Input } from '@angular/core';

import { ShopCategoryChange } from 'koffing/backend';

@Component({
    selector: 'kof-shop-category-change',
    templateUrl: 'shop-category-change.component.pug'
})
export class ShopCategoryChangeComponent {
    @Input()
    public categoryChange: ShopCategoryChange;
}
