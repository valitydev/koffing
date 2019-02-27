import { Component, Input } from '@angular/core';

import { ShopCreation } from 'koffing/backend';

@Component({
    selector: 'kof-shop-creation',
    templateUrl: 'shop-creation.component.pug'
})
export class ShopCreationComponent {
    @Input()
    public modification: ShopCreation;
}
