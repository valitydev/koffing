import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateRange } from './date-range';

@Component({
    selector: 'kof-date-range',
    templateUrl: 'date-range.component.pug',
    styleUrls: ['date-range.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent implements OnInit {
    @Output()
    public onSelect = new EventEmitter<DateRange>();

    public form: FormGroup;

    private defaultValues = {
        fromTime: moment()
            .subtract(1, 'month')
            .startOf('day')
            .toDate(),
        toTime: moment()
            .endOf('day')
            .toDate()
    };

    constructor(private fb: FormBuilder) {}

    public ngOnInit() {
        this.form = this.initForm();
        this.emitDate();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            fromTime: [this.defaultValues.fromTime, Validators.required],
            toTime: [this.defaultValues.toTime, Validators.required]
        });
    }

    private emitDate() {
        this.onSelect.emit(new DateRange(this.form.value.fromTime, this.form.value.toTime));
    }
}
