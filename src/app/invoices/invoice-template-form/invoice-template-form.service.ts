import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { COST_TYPE } from 'koffing/backend/constants/invoice-template-cost-type';

@Injectable()
export class InvoiceTemplateFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.controls.lifetime.setValidators(this.lifetimeValidator);
        this.form.valueChanges.subscribe((change) => this.setCostGroup(change));
    }

    private initForm(): FormGroup {
        return this.fb.group({
            product: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [Validators.maxLength(1000)]],
            selectedCostType: COST_TYPE.unlim,
            cost: this.getEmptyGroup(),
            lifetime: this.fb.group({
                days: ['', Validators.min(0)],
                months: ['', Validators.min(0)],
                years: ['', Validators.min(0)]
            })
        });
    }

    private lifetimeValidator(control: FormControl): { [key: string]: any } {
        const valid = Object.values(control.value).some((value: any) => value > 0);
        return valid ? null : {lifetime: 'need some days, month or years value'};
    }

    private setCostGroup(change: any) {
        if (change.selectedCostType === COST_TYPE.fixed && !this.hasCostType(COST_TYPE.fixed)) {
            this.form.setControl('cost', this.getFixedGroup());
        } else if (change.selectedCostType === COST_TYPE.range && !this.hasCostType(COST_TYPE.range)) {
            this.form.setControl('cost', this.getRangedGroup());
        } else if (change.selectedCostType === COST_TYPE.unlim && !this.hasCostType(COST_TYPE.unlim)) {
            this.form.setControl('cost', this.getEmptyGroup());
        }
    }

    private hasCostType(type: string): boolean {
        return this.form.value.cost.costType === type;
    }

    private getEmptyGroup(): FormGroup {
        return this.fb.group({
            costType: COST_TYPE.unlim
        });
    }

    private getFixedGroup(): FormGroup {
        return this.fb.group({
            costType: COST_TYPE.fixed,
            amount: ['', [Validators.required, Validators.min(10)]]
        });
    }

    private getRangedGroup(): FormGroup {
        return this.fb.group({
            costType: COST_TYPE.range,
            lowerBound: ['', [Validators.required, Validators.min(10)]],
            upperBound: ['', [Validators.required, Validators.min(10)]]
        });
    }
}
