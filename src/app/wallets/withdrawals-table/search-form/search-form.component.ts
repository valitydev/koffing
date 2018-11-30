import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { SearchFormService } from './search-form.service';
import { WITHDRAWAL_STATUS_LABEL } from '../../withdrawal-status-label';

@Component({
    selector: 'kof-withdrawal-search-form',
    templateUrl: 'search-form.component.pug',
    providers: [SearchFormService],
    styleUrls: ['search-form.component.less']
})
export class SearchFormComponent implements OnInit {

    @Output()
    public onSearch: EventEmitter<any> = new EventEmitter<any>();

    public searchForm: FormGroup;
    public additionalParamsVisible: boolean;
    public withdrawalStatuses: SelectItem[];

    constructor(private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.withdrawalStatuses = map(WITHDRAWAL_STATUS_LABEL, (name, key) => new SelectItem(key, name));
        this.searchForm = this.searchFormService.searchForm;
        this.onSearch.emit(this.searchForm.value);
        this.searchForm.valueChanges
            .filter(() => this.searchForm.status === 'VALID')
            .debounceTime(300)
            .subscribe((value) => this.onSearch.emit(value));
        this.additionalParamsVisible = this.searchFormService.hasFormAdditionalParams();
    }

    public reset() {
        this.onSearch.emit(this.searchFormService.reset());
    }

    public toggleAdditionalParamsVisible() {
        this.additionalParamsVisible = !this.additionalParamsVisible;
    }
}
