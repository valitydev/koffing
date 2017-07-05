import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { map, clone } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { FormSearchParams } from './form-search-params';
import { invoiceStatuses } from '../invoice-statuses';
import { paymentStatuses } from '../payment-statuses';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: FormSearchParams;

    @Input()
    public shopID: string;

    @Input()
    public isSearch: boolean = false;

    @Output()
    public onSearch: EventEmitter<FormSearchParams> = new EventEmitter<FormSearchParams>();

    public invoiceStatuses: SelectItem[];

    public paymentStatuses: SelectItem[];

    public isValidCardNumber: boolean = true;

    private initParams: FormSearchParams;

    public ngOnInit() {
        this.invoiceStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(paymentStatuses, (name, key) => new SelectItem(key, name));
        this.initParams = clone({
            from: this.searchParams.from,
            to: this.searchParams.to
        });
    }

    public selectFrom() {
        this.searchParams.from = moment(this.searchParams.from).startOf('day').toDate();
    }

    public selectTo() {
        this.searchParams.to = moment(this.searchParams.to).endOf('day').toDate();
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
        this.isValidCardNumber = this.searchParams.cardNumberMask
            ? /^\d{4}$/.test(this.searchParams.cardNumberMask)
            : true;
        return this.isValidCardNumber;
    }
}
