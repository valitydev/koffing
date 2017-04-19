import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { PAYMENT_STATUSES } from '../search-result/payment-statuses.const';
import { SelectItem } from 'koffing/common/common.module';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: any;

    @Output()
    public onSearch: EventEmitter<any> = new EventEmitter<any>();

    public fromTime: Date;
    public toTime: Date;
    public statuses: SelectItem[];
    public isInvalidDate: boolean = false;

    public ngOnInit() {
        this.fromTime = moment(this.searchParams.fromTime).toDate();
        this.toTime = moment(this.searchParams.toTime).toDate();
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name: string, key: string) => new SelectItem(key, name));
    }

    public selectFromTime() {
        this.fromTime = moment(this.fromTime).hour(0).minute(0).second(0).toDate();
        this.searchParams.fromTime = moment(this.fromTime).format();
    }

    public selectToTime() {
        this.toTime = moment(this.toTime).hour(23).minute(59).second(59).toDate();
        this.searchParams.toTime = moment(this.toTime).format();
    }

    public search() {
        if (this.fromTime.getTime() >= this.toTime.getTime()) {
            this.isInvalidDate = true;
            return false;
        }
        this.isInvalidDate = false;
        this.onSearch.emit();
    }
}
