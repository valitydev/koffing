import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-contract-form',
    templateUrl: 'contract-form.component.pug'
})
export class ContractFormComponent {

    @Input()
    public type: string;

    @Input()
    public form: FormGroup;
}
