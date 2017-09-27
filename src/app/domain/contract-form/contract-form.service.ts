import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { ContractCreation, RussianLegalEntity } from 'koffing/backend';
import { BankAccountFormService } from '../bank-account-form/bank-account-form.service';

@Injectable()
export class ContractFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            registeredName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            registeredNumber: ['', [
                Validators.required,
                Validators.pattern(/^(\d{13}|\d{15})$/)
            ]],
            inn: ['', [
                Validators.required,
                Validators.pattern(/^(\d{10}|\d{12})$/)
            ]],
            postAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            actualAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            representativePosition: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeFullName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeDocument: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            bankAccount: this.bankAccountFormService.initForm()
        });
    }

    public toContractCreation(contractForm: FormGroup): ContractCreation {
        const contractor = new RussianLegalEntity(contractForm.value);
        return new ContractCreation(uuid(), contractor);
    }
}
