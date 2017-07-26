import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { COST_TYPES } from './invoice-template-cost-types';

@Component({
    selector: 'kof-invoice-template-form',
    templateUrl: './invoice-template-form.component.pug',
    styleUrls: ['./invoice-template-form.component.less']
})
export class InvoiceTemplateFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public costTypesItems: SelectItem[];

    public ngOnInit() {
        this.costTypesItems = [
            new SelectItem(COST_TYPES.unlim, 'Без ограничений'),
            new SelectItem(COST_TYPES.fixed, 'Фиксированная'),
            new SelectItem(COST_TYPES.range, 'Диапазон')
        ];
    }

    public isSelected(costType: string): boolean {
        return this.form.value.selectedCostType === costType;
    }
}
