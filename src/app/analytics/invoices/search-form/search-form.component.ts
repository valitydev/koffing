import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { map, clone } from 'lodash';

import { SelectItem } from 'koffing/common/common.module';
import { FormSearchParams } from './form-search-params';
import { invoiceStatuses } from '../invoice-statuses';
import { paymentStatuses } from '../payment-statuses';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: FormSearchParams;

    @Output()
    public onSearch: EventEmitter<FormSearchParams> = new EventEmitter<FormSearchParams>();

    public invoiceStatuses: SelectItem[];

    public paymentStatuses: SelectItem[];

    public isValidDateRange: boolean = true;

    public isValidCardNumber: boolean = true;

    private initParams: FormSearchParams;

    public ngOnInit() {
        this.invoiceStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(paymentStatuses, (name, key) => new SelectItem(key, name));
        this.initParams = clone(this.searchParams);
    }

    public selectFrom() {
        this.searchParams.from = moment(this.searchParams.from)
            .hour(0).minute(0).second(0).toDate();
    }

    public selectTo() {
        this.searchParams.to = moment(this.searchParams.to)
            .hour(23).minute(59).second(59).toDate();
    }

    public search() {
        if (this.validate()) {
            this.onSearch.emit(this.searchParams);
        }
    }

    public reset() {
        this.searchParams = clone(this.initParams);
        this.search();
    }

    private validate(): boolean {
        this.isValidDateRange = this.searchParams.from < this.searchParams.to;
        this.isValidCardNumber = this.searchParams.cardNumberMask
            ? /^\d{4}$/.test(this.searchParams.cardNumberMask)
            : true;
        return this.isValidDateRange && this.isValidCardNumber;
    }
}
