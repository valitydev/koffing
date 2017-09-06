import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { COST_TYPE } from 'koffing/backend/constants/invoice-template-cost-type';

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
            new SelectItem(COST_TYPE.unlim, 'Без ограничений'),
            new SelectItem(COST_TYPE.fixed, 'Фиксированная'),
            new SelectItem(COST_TYPE.range, 'Диапазон')
        ];
    }

    public isSelected(costType: string): boolean {
        return this.form.value.selectedCostType === costType;
    }
}
