import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'kof-international-contract-form',
    templateUrl: 'international-contract-form.component.pug'
})
export class InternationalContractFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    @Input()
    public type: string;

    public bankAccountForm: AbstractControl;

    public ngOnInit() {
        this.bankAccountForm = this.form.get('bankAccount');
    }
}
