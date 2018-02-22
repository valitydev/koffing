import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kof-russian-contract-form',
    templateUrl: 'russian-contract-form.component.pug'
})
export class RussianContractFormComponent implements OnInit, AfterViewInit {

    @Input()
    public form: FormGroup;

    @Input()
    public type: string;

    public bankAccountForm: AbstractControl;

    constructor(
        private suggestionsService: SuggestionsService,
        private route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.type = params.type;
        });
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
