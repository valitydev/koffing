import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { COST_TYPE, TEMPLATE_TYPE, INVOICE_LINE_TAX_VAT_RATES } from 'koffing/backend';
import { InvoiceTemplateFormService } from './invoice-template-form.service';

@Component({
    selector: 'kof-invoice-template-form',
    templateUrl: './invoice-template-form.component.pug',
    styleUrls: ['./invoice-template-form.component.less']
})
export class InvoiceTemplateFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public costTypesItems: SelectItem[];
    public templateTypeItems: SelectItem[];
    public invoiceLineTaxItems: SelectItem[];

    constructor(private invoiceTemplateFormService: InvoiceTemplateFormService) { }

    public ngOnInit() {
        this.costTypesItems = [
            new SelectItem(COST_TYPE.unlim, 'Без ограничений'),
            new SelectItem(COST_TYPE.fixed, 'Фиксированная'),
            new SelectItem(COST_TYPE.range, 'Диапазон')
        ];
        this.templateTypeItems = [
            new SelectItem(TEMPLATE_TYPE.singleLine, 'Одиночная позиция'),
            new SelectItem(TEMPLATE_TYPE.multiLine, 'Корзина товаров')
        ];
        this.invoiceLineTaxItems = map(INVOICE_LINE_TAX_VAT_RATES, (value) => new SelectItem(value, value));
    }

    public isSelectedCostType(costType: string): boolean {
        return this.form.value.selectedCostType === costType;
    }

    public isSelectedTemplateType(templateType: string): boolean {
        return this.form.value.selectedTemplateType === templateType;
    }

    public addProduct() {
        this.invoiceTemplateFormService.addProduct();
    }

    public removeProduct(index: number) {
        this.invoiceTemplateFormService.removeProduct(index);
    }
}
