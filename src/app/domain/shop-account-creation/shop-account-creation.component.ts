import { Component, Input } from '@angular/core';

import { ShopAccountCreation } from 'koffing/backend';

@Component({
    selector: 'kof-shop-account-creation',
    templateUrl: 'shop-account-creation.component.pug'
})
export class ShopAccountCreationComponent {
    @Input()
    public account: ShopAccountCreation;
}
