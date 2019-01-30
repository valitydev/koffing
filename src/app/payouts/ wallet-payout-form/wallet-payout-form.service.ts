import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class WalletPayoutFormService {
    public walletPayoutForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.walletPayoutForm = this.initForm();
    }

    public setDefaultValues(params?: {}) {
        this.walletPayoutForm.reset();
        this.walletPayoutForm.patchValue({
            payoutTool: '',
            amount: '',
            currency: ''
        });
    }

    private initForm(): FormGroup {
        return this.fb.group({
            payoutTool: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(1)]],
            currency: ['']
        });
    }
}
