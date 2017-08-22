import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';

import { Product } from './product';
import { INVOICE_TYPES } from './invoice-types';

@Injectable()
export class InvoiceFormService {

    public form: FormGroup;

    get cart(): FormArray {
        return this.form.get('cart') as FormArray;
    }

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.controls.selectedInvoiceType.valueChanges.subscribe((invoiceType) => this.initCart(invoiceType));
    }

    public addProduct() {
        this.cart.push(this.getProduct());
    }

    public removeProduct(index: number) {
        if (this.cart.length > 1) {
            this.cart.removeAt(index);
        }
    }

    private initForm(): FormGroup {
        return this.fb.group({
            amount: ['', [ Validators.required, Validators.min(10) ]],
            product: ['', [ Validators.required, Validators.maxLength(100) ]],
            description: ['', [ Validators.maxLength(1000) ]],
            dueDate: ['', [ Validators.required ]],
            selectedInvoiceType: ['', [ Validators.required ]],
            cart: this.fb.array([]),
            cartAmount: ['']
        });
    }

    private initCart(invoiceType: string) {
        this.form.setControl('cart', this.fb.array([]));
        if (invoiceType === INVOICE_TYPES.cart) {
            this.addProduct();
            this.form.controls.cart.valueChanges.subscribe((cart) => this.calculateCartAmount(cart));
        }
    }

    private calculateCartAmount(cart: Product[]) {
        this.form.patchValue({
            cartAmount: reduce(cart, (result, product) => result + product.price * product.quantity, 0)
        });
    }

    private getProduct(): FormGroup {
        return this.fb.group({
            quantity: ['', [ Validators.required, Validators.min(1) ]],
            price: ['', [ Validators.required, Validators.min(10) ]],
            description: ['', [ Validators.required, Validators.maxLength(1000) ]],
        });
    }
}
