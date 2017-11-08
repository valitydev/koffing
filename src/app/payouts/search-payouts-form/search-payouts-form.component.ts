import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    constructor(private searchPayoutsFormService: SearchPayoutsFormService) { }

    public ngOnInit() {
        this.form = this.searchPayoutsFormService.form;
        this.form.valueChanges
            .filter((value) => this.form.status === 'VALID')
            .debounceTime(100)
            .subscribe(() => this.onReadyParams.emit());
    }
}
