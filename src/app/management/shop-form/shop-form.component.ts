import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-shop-form',
    templateUrl: 'shop-form.component.pug',
    styleUrls: ['shop-form.component.less']
})
export class ShopGroupComponent {

    @Input()
    public form: FormGroup;

}
