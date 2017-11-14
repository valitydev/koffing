import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { reduce } from 'lodash';

import { COST_TYPE, TEMPLATE_TYPE, InvoiceLine } from 'koffing/backend';

@Injectable()
export class InvoiceTemplateFormService {

    public form: FormGroup;

    get details(): FormGroup {
        return this.form.get('details') as FormGroup;
    }

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.controls.lifetime.setValidators(this.lifetimeValidator);
        this.form.controls.selectedTemplateType.valueChanges.subscribe((templateType) => {
            this.form.setControl('details', this.getTemplateGroup(templateType, this.form.value.selectedCostType));
            this.subscribeCartValueChanges(this.details);
        });
        this.form.controls.selectedCostType.valueChanges.subscribe((costType) => {
            this.details.setControl('cost', this.getCostGroup(costType));
        });
    }

    public addProduct() {
        const cart = this.details.controls.cart as FormArray;
        cart.push(this.getProduct());
    }

    public removeProduct(index: number) {
        const cart = this.details.controls.cart as FormArray;
        if (cart.length > 1) {
            cart.removeAt(index);
        }
    }

    private initForm(): FormGroup {
        return this.fb.group({
            description: ['', [Validators.maxLength(1000)]],
            lifetime: this.fb.group({
                days: ['', Validators.min(0)],
                months: ['', Validators.min(0)],
                years: ['', Validators.min(0)]
            }),
            selectedCostType: COST_TYPE.unlim,
            selectedTemplateType: TEMPLATE_TYPE.singleLine,
            details: this.getTemplateGroup(TEMPLATE_TYPE.singleLine, COST_TYPE.unlim)
        });
    }

    private subscribeCartValueChanges(details: FormGroup) {
        if (details.controls.cart) {
            const cart = details.controls.cart as FormArray;
            const cartAmount = details.controls.cartAmount as FormControl;
            cart.valueChanges.subscribe((cartValue) => cartAmount.patchValue(this.calculateCartAmount(cartValue)));
        }
    }

    private calculateCartAmount(cart: InvoiceLine[]): number {
        return reduce(cart, (result, product) => result + product.price * product.quantity, 0);
    }

    private getProduct(): FormGroup {
        return this.fb.group({
            product: ['', [ Validators.required, Validators.maxLength(1000) ]],
            quantity: ['', [ Validators.required, Validators.min(1) ]],
            price: ['', [ Validators.required, Validators.min(10) ]],
            tax: ['']
        });
    }

    private getTemplateGroup(templateType: string, costType?: string) {
        let templateGroup;
        if (templateType === TEMPLATE_TYPE.singleLine) {
            templateGroup = this.fb.group({
                product: ['', [Validators.required]],
                tax: [''],
                cost: this.getCostGroup(costType)
            });
        } else if (templateType === TEMPLATE_TYPE.multiLine) {
            templateGroup = this.fb.group({
                cartAmount: 0,
                cart: this.fb.array([this.getProduct()])
            });
        }
        return templateGroup;
    }

    private getCostGroup(costType: string) {
        let costGroup;
        if (costType === COST_TYPE.unlim) {
            costGroup = this.fb.group({});
        } else if (costType === COST_TYPE.fixed) {
            costGroup = this.fb.group({
                amount: ['', [Validators.required, Validators.min(10)]]
            });
        } else if (costType === COST_TYPE.range) {
            costGroup = this.fb.group({
                lowerBound: ['', [Validators.required, Validators.min(10)]],
                upperBound: ['', [Validators.required, Validators.min(10)]]
            });
        }
        return costGroup;
    }

    private lifetimeValidator(control: FormControl): { [key: string]: any } {
        const valid = Object.values(control.value).some((value: any) => value > 0);
        return valid ? null : {lifetime: 'need some days, month or years value'};
    }
}
