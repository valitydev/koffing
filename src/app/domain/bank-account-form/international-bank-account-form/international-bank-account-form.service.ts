import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class InternationalBankAccountFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public initForm(): FormGroup {
        const bank = {
            BIC: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
            ABARTN: ['', [Validators.pattern(/^[0-9]{9}$/)]],
            Name: ['', [Validators.maxLength(100)]],
            CountryCode: ['', [Validators.pattern(/^[A-Z]{2}$/)]],
            Address: ['', [Validators.maxLength(1000)]],
        };
        const controlsConfig = {
            number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
            iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
        };
        for (const param of Object.keys(bank)) {
            controlsConfig['bankDetails' + param] = controlsConfig['correspondentBankAccount' + param] = bank[param];
        }
        return this.fb.group(controlsConfig);
    }
}
