import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kof-russian-bank-account-form',
    templateUrl: 'russian-bank-account-form.component.pug'
})
export class RussianBankAccountFormComponent implements AfterViewInit, OnInit {
    @Input()
    public form: FormGroup;

    public type: string;

    @Input()
    public suggestionCssClass: string;

    constructor(private suggestionsService: SuggestionsService, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.type = params.type;
        });
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    private initBankSuggestions() {
        const selector = this.suggestionCssClass
            ? `.${this.suggestionCssClass}`
            : '.bank-suggestions';
        this.suggestionsService.initBankSuggestions(selector, this.handleBank.bind(this));
    }

    private handleBank(suggestion: BankSuggestion) {
        const value = this.toFormValue(suggestion);
        this.form.patchValue(value);
    }

    private toFormValue(suggestion: BankSuggestion): any {
        const value: any = {};
        if (suggestion) {
            value.bankName = suggestion.unrestricted_value;
            if (suggestion.data) {
                value.bankPostAccount = suggestion.data.correspondent_account;
                value.bankBik = suggestion.data.bic;
            }
        }
        return value;
    }
}
