import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class InternationalBankAccountFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) { }

    public initForm(): FormGroup {
        return this.fb.group({
            accountHolder: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankAddress: ['', [
                Validators.required,
                Validators.maxLength(150)
            ]],
            iban: ['', [
                Validators.required,
                Validators.pattern(/^[A-Z0-9]{3,34}$/)
            ]],
            bic: ['', [
                Validators.required,
                Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)
            ]]
        });
    }
}
