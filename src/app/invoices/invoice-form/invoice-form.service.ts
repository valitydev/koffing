import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';
import * as moment from 'moment';

import { InvoiceLine } from 'koffing/backend/model/invoice-cart/invoice-line';

@Injectable()
export class InvoiceFormService {
    public form: FormGroup;
    private cartControlName: string = 'cart';

    get cart(): FormArray {
        return this.form.get(this.cartControlName) as FormArray;
    }

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.initCart();
    }

    public addProduct() {
        this.cart.push(this.getProduct());
    }

    public removeProduct(index: number) {
        if (this.cart.length > 1) {
            this.cart.removeAt(index);
        }
    }

    public setDefaultValues(params?: {}) {
        this.form.reset();
        this.form.patchValue({
            product: '',
            description: '',
            dueDate: moment()
                .add(1, 'd')
                .toDate(),
            currency: '',
            ...params
        });
        this.initCart();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            product: ['', [Validators.required, Validators.maxLength(100)]],
            description: ['', [Validators.maxLength(1000)]],
            dueDate: ['', [Validators.required]],
            amount: [''],
            currency: ['', [Validators.required, Validators.pattern(/[A-Z]{3}$/)]]
        });
    }

    private initCart() {
        this.form.setControl(this.cartControlName, this.fb.array([]));
        this.form.controls.cart.valueChanges.subscribe(cart => this.calculateCartAmount(cart));
        this.addProduct();
    }

    private calculateCartAmount(cart: InvoiceLine[]) {
        this.form.patchValue({
            amount: reduce(cart, (result, product) => result + product.price * product.quantity, 0)
        });
    }

    private getProduct(): FormGroup {
        return this.fb.group({
            product: ['', [Validators.required, Validators.maxLength(1000)]],
            quantity: ['', [Validators.required, Validators.min(1)]],
            price: ['', [Validators.required, Validators.min(1)]],
            tax: ['']
        });
    }
}
