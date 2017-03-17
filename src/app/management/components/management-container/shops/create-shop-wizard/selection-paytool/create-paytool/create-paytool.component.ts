import { Component, Output, Input, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PaytoolTransfer } from './paytool-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { SuggestionConverterService } from 'koffing/suggestions/services/suggestion-converter.service';
import { BankAccountComparator } from './payout-tool-comparator.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug',
    styleUrls: [`.title-label { padding-top: 5px; }`]
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Input()
    public contractBankAccount: BankAccount;

    @Output()
    public onChange = new EventEmitter();

    public payoutToolParams: PayoutToolBankAccount;

    @ViewChild('createPaytoolForm')
    public form: NgForm;

    public sameBankAccountChecked: boolean;

    @Input()
    private defaultPayoutToolParams: PayoutToolBankAccount;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }

    public ngOnInit() {
        this.payoutToolParams = this.getInstance();
        if (this.defaultPayoutToolParams) {
            _.assign(this.payoutToolParams, this.defaultPayoutToolParams);
        }
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    public emitData() {
        const transfer = new PaytoolTransfer(this.payoutToolParams, this.form.valid);
        this.onChange.emit(transfer);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public copyContractBankAccount(event: any) {
        if (this.sameBankAccountChecked) {
            this.setFormControls(this.contractBankAccount);
            this.emitData();
        }
    }

    private getInstance() {
        const bankAccount = new BankAccount();
        const instance = new PayoutToolBankAccount();
        instance.currency = 'rub';
        instance.bankAccount = bankAccount;
        return instance;
    }

    private handleBankSuggestion(suggestion: BankSuggestion) {
        const suggestionAccount = SuggestionConverterService.toBankAccount(suggestion);
        this.setFormControls(suggestionAccount);
        this.emitData();
    }

    private setFormControls(object: BankAccount) {
        if (_.isNil(object)) {
            return;
        }
        _.forEach(object, (value, fieldName) => {
            const control = this.form.controls[fieldName];
            if (control) {
                control.setValue(value);
            }
        });
    }

    private initBankSuggestions() {
        const selector = '.paytool-bank-suggestions';
        this.suggestionsService.initBankSuggestions(selector, this.handleBankSuggestion.bind(this));
    }
}
