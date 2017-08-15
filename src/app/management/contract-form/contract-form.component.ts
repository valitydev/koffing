import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { ContractFormService } from './contract-form.service';

@Component({
    selector: 'kof-contract-form',
    templateUrl: 'contract-form.component.pug',
    styleUrls: ['contract-form.component.less'],
    providers: [ContractFormService]
})
export class ContractFormComponent implements OnInit, AfterViewInit {

    @Input()
    public form: FormGroup;

    public accountGroup: AbstractControl;

    constructor(private suggestionsService: SuggestionsService,
                private contractFormService: ContractFormService) {
    }

    public ngOnInit() {
        this.accountGroup = this.form.get('bankAccount');
    }

    public ngAfterViewInit() {
        this.initContractorSuggestions();
    }

    private handleContractor(suggestion: OgranizationSuggestion) {
        const value = this.contractFormService.toFormValue(suggestion);
        this.form.patchValue(value);
    }

    private initContractorSuggestions() {
        const selector = '.contractor-suggestions';
        this.suggestionsService.initContractorSuggestions(selector, this.handleContractor.bind(this));
    }
}
