import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { SearchPayoutsFormService } from './search-payouts-form.service';
import { PAYOUT_TOOL_TYPE_LABEL } from '../payout-tool-type-label';

@Component({
    selector: 'kof-search-payouts-form',
    templateUrl: 'search-payouts-form.component.pug',
    styleUrls: ['search-payouts-form.component.less']
})
export class SearchPayoutsFormComponent implements OnInit {

    @Output()
    public onReadyParams: EventEmitter<void> = new EventEmitter<void>();

    public form: FormGroup;
    public payoutToolTypes: SelectItem[];

    constructor(private searchPayoutsFormService: SearchPayoutsFormService) { }

    public ngOnInit() {
        this.payoutToolTypes = map(PAYOUT_TOOL_TYPE_LABEL, (name, key) => new SelectItem(key, name));

        this.form = this.searchPayoutsFormService.form;
        this.form.valueChanges
            .filter((value) => this.form.status === 'VALID')
            .debounceTime(100)
            .subscribe(() => this.onReadyParams.emit());
    }
}
