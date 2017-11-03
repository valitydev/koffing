import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { PAYOUT_STATUS_LABEL } from 'koffing/common/payout-status-label';
import { SearchPayoutsFormService } from './search-payouts-form.service';

@Component({
    selector: 'kof-search-payouts-form',
    templateUrl: 'search-payouts-form.component.pug',
    styleUrls: ['search-payouts-form.component.less']
})
export class SearchPayoutsFormComponent implements OnInit {

    @Output()
    public onReadyParams: EventEmitter<void> = new EventEmitter<void>();

    public form: FormGroup;
    public payoutStatuses: SelectItem[];

    constructor(private searchPayoutsFormService: SearchPayoutsFormService) { }

    public ngOnInit() {
        this.payoutStatuses = map(PAYOUT_STATUS_LABEL, (name, key) => new SelectItem(key, name));

        this.form = this.searchPayoutsFormService.form;
        this.form.valueChanges
            .filter((value) => this.form.status === 'VALID')
            .debounceTime(100)
            .subscribe(() => this.onReadyParams.emit());
    }
}
