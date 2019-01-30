import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-bank-account-form',
    templateUrl: 'bank-account-form.component.pug'
})
export class BankAccountFormComponent {
    @Input()
    public type: string;

    @Input()
    public form: FormGroup;
}
