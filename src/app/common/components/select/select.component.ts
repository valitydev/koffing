import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectItem } from './select.class';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    selector: 'kof-select',
    templateUrl: 'select.component.pug',
    styleUrls: ['select.component.less'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent {

    @Input()
    public items: SelectItem[];
    @Input()
    public placeholder: any;
    @Input()
    public modelOptions: any;
    @Input()
    public hasError: boolean = false;
    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();
    private innerSelectedValue: any;
    private onTouchedCallback: Function;
    private onChangeCallback: Function;

    set selectedValue(value: any) {
        if (value !== this.innerSelectedValue) {
            this.innerSelectedValue = value;
            this.onChangeCallback(value);
            this.onChange.emit(value);
        }
    }

    get selectedValue(): any {
        if (!this.innerSelectedValue && this.placeholder) {
            this.innerSelectedValue = '';
        }
        return this.innerSelectedValue;
    };

    public writeValue(value: any) {
        if (value !== this.innerSelectedValue) {
            this.innerSelectedValue = value;
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}
