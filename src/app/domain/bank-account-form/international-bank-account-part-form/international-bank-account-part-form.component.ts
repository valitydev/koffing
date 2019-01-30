import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'kof-international-bank-account-part-form',
    templateUrl: 'international-bank-account-part-form.component.pug'
})
export class InternationalBankAccountPartFormComponent implements OnInit {
    @Input()
    public form: FormGroup;

    @Input()
    public suggestionCssClass: string;

    public formsClasses: { [name: string]: string } = {};

    public ngOnInit() {
        this.updateFormClasses();
        this.form.valueChanges.subscribe(this.updateFormClasses.bind(this));
    }

    private updateFormClasses() {
        for (const name of Object.keys(this.form.controls)) {
            this.formsClasses[name] =
                'form-group' + (this.form.controls[name].invalid ? ' has-error' : '');
        }
    }
}
