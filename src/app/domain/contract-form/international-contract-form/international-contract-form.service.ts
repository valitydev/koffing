import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { BankAccountFormService } from '../../bank-account-form/bank-account-form.service';

@Injectable()
export class InternationalContractFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder,
                private bankAccountFormService: BankAccountFormService) {
    }

    public initForm(type: string): FormGroup {
        return this.fb.group({
            legalName: ['', [
                Validators.required
            ]],
            registeredOffice: ['', [
                Validators.required
            ]],
            tradingName: [''],
            principalPlaceOfBusiness: [''],
            bankAccount: this.bankAccountFormService.initForm(type)
        });
    }
}
