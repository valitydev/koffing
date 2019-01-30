import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectItem } from './select-item';

@Component({
    selector: 'kof-select',
    templateUrl: 'select.component.pug',
    styleUrls: ['select.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectComponent,
            multi: true
        }
    ]
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
    private onTouchedCallback: any;
    private onChangeCallback: any;

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
    }

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
