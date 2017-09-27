import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class BankAccountFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) { }

    public initForm(): FormGroup {
        return this.fb.group({
            account: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankPostAccount: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankBik: ['', [
                Validators.required,
                Validators.pattern(/^\d{9}$/)
            ]]
        });
    }
}
