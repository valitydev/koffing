import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HOLD_EXPIRATION } from 'koffing/backend/constants/hold-expiration';

@Injectable()
export class CheckoutConfigFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            name: [''],
            description: [''],
            email: [''],
            redirectUrl: [''],
            paymentFlowHold: [false, [Validators.required]],
            holdExpiration: [HOLD_EXPIRATION.cancel, [Validators.required]],
            bankCard: new FormControl({ value: true, disabled: true }),
            wallets: false,
            terminals: false,
            applePay: false,
            googlePay: false,
            samsungPay: false
        });
    }
}
