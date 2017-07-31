import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { SelectItem } from 'koffing/common/select/select-item';
import { INVOICE_TYPES } from './invoice-types';

@Component({
    selector: 'kof-invoice-form',
    templateUrl: './invoice-form.component.pug',
    styleUrls: ['./invoice-form.component.less']
})
export class InvoiceFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public invoiceTypesItems: SelectItem[];
    public minDueDate: Date = moment().toDate();

    constructor(private fb: FormBuilder) {}

    public ngOnInit() {
        this.invoiceTypesItems = [
            new SelectItem(INVOICE_TYPES.fixed, 'Фиксированная стоимость'),
            new SelectItem(INVOICE_TYPES.cart, 'Список товаров')
        ];
    }

    public isSelected(type: string): boolean {
        return this.form.value.selectedInvoiceType === type;
    }

    public removeProduct(index: number) {
        this.cart.removeAt(index);
    }

    public addProduct() {
        this.cart.push(this.product());
    }

    private product(): FormGroup {
        return this.fb.group({
            quantity: ['', [ Validators.required ]],
            price: ['', [ Validators.required, Validators.maxLength(100) ]],
            description: ['', [ Validators.required, Validators.maxLength(1000) ]],
        });
    }

    get cart(): FormArray {
        return this.form.get('cart') as FormArray;
    }
}
