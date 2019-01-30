import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class InternationalBankAccountFormService {
    public forms: FormGroup[];

    constructor(private fb: FormBuilder) {}

    public initForm(): FormGroup {
        const controlsConfig = {
            number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
            iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
            bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
            abartn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
            name: ['', [Validators.maxLength(100)]],
            countryCode: ['', [Validators.pattern(/^[A-Z]{3}$/)]],
            address: ['', [Validators.maxLength(1000)]]
        };
        return this.fb.group({
            ...controlsConfig,
            correspondentBankAccount: this.fb.group(controlsConfig)
        });
    }
}
