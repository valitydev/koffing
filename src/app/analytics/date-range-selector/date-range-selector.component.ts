import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import * as moment from 'moment';
import { DateRange } from './date-range.class';

@Component({
    selector: 'kof-date-range-selector',
    templateUrl: './date-range-selector.component.pug',
    styleUrls: ['./date-range-selector.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DateRangeSelectorComponent {

    @Input()
    public from: Date;

    @Input()
    public to: Date;

    @Input()
    public buttonName: string;

    @Input()
    public disabled: boolean = false;

    @Output()
    public onSelect = new EventEmitter<DateRange>();

    public selectFrom() {
        this.from = moment(this.from).startOf('day').toDate();
    }

    public selectTo() {
        this.to = moment(this.to).endOf('day').toDate();
    }

    public select() {
        this.onSelect.emit(new DateRange(this.from, this.to));
    }
}
