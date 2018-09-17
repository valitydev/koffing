import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kof-international-bank-account-form',
    templateUrl: 'international-bank-account-form.component.pug'
})
export class InternationalBankAccountFormComponent implements AfterViewInit, OnInit {

    @Input()
    public form: FormGroup;

    public type: string;

    @Input()
    public suggestionCssClass: string;

    public formsClasses: {[name: string]: string} = {};

    constructor(
        private suggestionsService: SuggestionsService,
        private route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.type = params.type;
        });
        this.updateFormClasses();
        this.form.valueChanges.subscribe(this.updateFormClasses.bind(this));
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    private updateFormClasses() {
        for (const name of Object.keys(this.form.controls)) {
            this.formsClasses[name] = 'form-group' + (this.form.controls[name].invalid ? ' has-error' : '');
        }
    }

    private initBankSuggestions() {
        const selector = this.suggestionCssClass ? `.${this.suggestionCssClass}` : '.bank-suggestions';
        this.suggestionsService.initBankSuggestions(selector, this.handleBank.bind(this));
    }

    private handleBank(suggestion: BankSuggestion) {
        const value = this.toFormValue(suggestion);
        this.form.patchValue(value);
    }

    private toFormValue(suggestion: BankSuggestion): any {
        const value: any = {};
        if (suggestion) {
            value.bankDetailsName = suggestion.unrestricted_value;
            if (suggestion.data) {
                value.bankDetailsBIC = suggestion.data.bic;
            }
        }
        return value;
    }
}
