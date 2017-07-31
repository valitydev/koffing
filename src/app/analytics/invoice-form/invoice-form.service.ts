import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';

import { Product } from './product';

@Injectable()
export class InvoiceFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.controls.cart.valueChanges.subscribe((change) => this.calculateCartAmount(change));
    }

    private initForm(): FormGroup {
        return this.fb.group({
            amount: ['', [ Validators.required ]],
            product: ['', [ Validators.required, Validators.maxLength(100) ]],
            description: ['', [ Validators.maxLength(1000) ]],
            dueDate: ['', [ Validators.required ]],
            selectedInvoiceType: ['', [ Validators.required ]],
            cart: this.fb.array([]),
            cartAmount: ['']
        });
    }

    private calculateCartAmount(cart: Product[]) {
        this.form.patchValue({
            cartAmount: reduce(cart, (result, product) => result + product.price * product.quantity, 0)
        });
    }
}
