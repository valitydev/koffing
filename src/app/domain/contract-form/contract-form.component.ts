import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';

@Component({
    selector: 'kof-contract-form',
    templateUrl: 'contract-form.component.pug'
})
export class ContractFormComponent implements OnInit, AfterViewInit {

    @Input()
    public form: FormGroup;
    
    public bankAccountForm: AbstractControl;

    constructor(private suggestionsService: SuggestionsService) { }

    public ngOnInit() {
        this.bankAccountForm = this.form.get('bankAccount');
    }

    public ngAfterViewInit() {
        this.initContractorSuggestions();
    }

    private initContractorSuggestions() {
        const selector = '.contractor-suggestions';
        this.suggestionsService.initContractorSuggestions(selector, this.handleContractor.bind(this));
    }

    private handleContractor(suggestion: OgranizationSuggestion) {
        const value = this.toFormValue(suggestion);
        this.form.patchValue(value);
    }

    private toFormValue(suggestion: OgranizationSuggestion): any {
        const value: any = {};
        if (suggestion) {
            value.registeredName = suggestion.unrestricted_value;
            if (suggestion.data) {
                value.registeredNumber = suggestion.data.ogrn;
                value.inn = suggestion.data.inn;
                if (suggestion.data.address) {
                    value.postAddress = suggestion.data.address.unrestricted_value;
                }
                if (suggestion.data.management) {
                    value.representativePosition = suggestion.data.management.post;
                    value.representativeFullName = suggestion.data.management.name;
                }
            }
        }
        return value;
    }
}
