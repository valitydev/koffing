import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-checkout-config-form',
    templateUrl: './checkout-config-form.component.pug',
    styles: [`.form-control {height: 30px;}`]
})
export class CheckoutConfigFormComponent {

    @Input()
    public form: FormGroup;

}
