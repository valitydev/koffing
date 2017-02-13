import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { SuggestionConverterService } from 'koffing/suggestions/services/suggestion-converter.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Output()
    public onChange = new EventEmitter();

    public payoutTool: PayoutToolBankAccount;

    @ViewChild('createPaytoolForm')
    private form: NgForm;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }

    public ngOnInit() {
        this.payoutTool = this.getInstance();
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    public emitData() {
        this.onChange.emit(new PaytoolTransfer(this.payoutTool, this.form.valid));
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private getInstance() {
        const bankAccount = new BankAccount();
        const instance = new PayoutToolBankAccount();
        instance.bankAccount = bankAccount;
        return instance;
    }

    private handleBankSuggestion(suggestion: BankSuggestion) {
        const suggestionAccount = SuggestionConverterService.toBankAccount(suggestion);
        _.assign(this.payoutTool.bankAccount, suggestionAccount);
        _.delay(() => {
            this.emitData();
        }, 0);
    }

    private initBankSuggestions() {
        this.suggestionsService.initBankSuggestions(
            'input.paytool-bank-suggestions',
            this.handleBankSuggestion.bind(this)
        );
    }

}
