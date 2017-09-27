import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-shop-form',
    templateUrl: 'shop-form.component.pug',
})
export class ShopFormComponent {

    @Input()
    public form: FormGroup;

}
