import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';
import * as moment from 'moment';

import { InvoiceLine } from 'koffing/backend/model/invoice-cart/invoice-line';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'koffing/backend/shop.service';

@Injectable()
export class InvoiceFormService {

    public form: FormGroup;
    private currency: string;
    private cartControlName: string = 'cart';

    get cart(): FormArray {
        return this.form.get(this.cartControlName) as FormArray;
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private shopService: ShopService) {
        this.form = this.initForm();
        this.initCart();
        this.route.parent.params.switchMap((params) =>
            this.shopService.getShopByID(params.shopID)).subscribe((shop) => {
            this.currency = shop.account.currency;
        });
    }

    public addProduct() {
        this.cart.push(this.getProduct());
    }

    public removeProduct(index: number) {
        if (this.cart.length > 1) {
            this.cart.removeAt(index);
        }
    }

    public setDefaultValues() {
        this.form.reset();
        this.form.patchValue({
            product: '',
            description: '',
            dueDate: moment().add(1, 'd').toDate(),
            currency: this.currency
        });
        this.initCart();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            product: ['', [ Validators.required, Validators.maxLength(100) ]],
            description: ['', [ Validators.maxLength(1000) ]],
            dueDate: ['', [ Validators.required ]],
            amount: [''],
            currency: [this.currency, [
                Validators.required,
                Validators.pattern(/[A-Z]{3}$/)]
            ],
        });
    }

    private initCart() {
        this.form.setControl(this.cartControlName, this.fb.array([]));
        this.form.controls.cart.valueChanges.subscribe((cart) => this.calculateCartAmount(cart));
        this.addProduct();
    }

    private calculateCartAmount(cart: InvoiceLine[]) {
        this.form.patchValue({
            amount: reduce(cart, (result, product) => result + product.price * product.quantity, 0)
        });
    }

    private getProduct(): FormGroup {
        return this.fb.group({
            product: ['', [ Validators.required, Validators.maxLength(1000) ]],
            quantity: ['', [ Validators.required, Validators.min(1) ]],
            price: ['', [ Validators.required, Validators.min(10) ]],
            tax: ['']
        });
    }
}
