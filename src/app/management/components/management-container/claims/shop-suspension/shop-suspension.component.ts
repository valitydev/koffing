import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-suspension',
    templateUrl: 'shop-suspension.component.pug'
})
export class ShopSuspensionComponent {

    @Input()
    public suspension: any;
}
