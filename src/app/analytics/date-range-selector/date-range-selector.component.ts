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

    @Output()
    public onSelect = new EventEmitter();

    private isInvalidDate: boolean = false;

    public selectFrom() {
        this.from = moment(this.from).hour(0).minute(0).second(0).toDate();
    }

    public selectTo() {
        this.to = moment(this.to).hour(23).minute(59).second(59).toDate();
    }

    public select() {
        if (this.from >= this.to) {
            this.isInvalidDate = true;
            return false;
        }
        this.isInvalidDate = false;
        this.onSelect.emit(new DateRange(this.from, this.to));
    }
}
