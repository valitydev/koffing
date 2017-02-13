import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { SuggestionConverterService } from 'koffing/suggestions/services/suggestion-converter.service';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit, AfterViewInit {

    @Output()
    public onChange = new EventEmitter();

    public contractor: Contractor;

    @ViewChild('createContractForm')
    private form: NgForm;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }

    public ngOnInit() {
        this.contractor = this.createInstance();
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
        this.initContractorSuggestions();
    }

    public emitData() {
        this.onChange.emit(new ContractorTransfer(this.contractor, this.form.valid));
    }

    public emitDataDelayed() {
        _.delay(() => {
            this.emitData();
        }, 0);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private createInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        const instance = new Contractor();
        instance.bankAccount = bankAccountArgs;
        instance.legalEntity = entityArgs;
        return instance;
    }

    private handleBankSuggestion(suggestion: BankSuggestion) {
        const suggestionAccount = SuggestionConverterService.toBankAccount(suggestion);
        _.assign(this.contractor.bankAccount, suggestionAccount);
        this.emitDataDelayed();
    }

    private handleContractorSuggestion(suggestion: OgranizationSuggestion) {
        const suggestionEntity = SuggestionConverterService.toRussianLegalEntity(suggestion);
        _.assign(this.contractor.legalEntity, suggestionEntity);
        this.emitDataDelayed();
    }

    private initBankSuggestions() {
        this.suggestionsService.initBankSuggestions(
            'input.contract-bank-suggestions',
            this.handleBankSuggestion.bind(this)
        );
    }

    private initContractorSuggestions() {
        this.suggestionsService.initContractorSuggestions(
            'input.contractor-suggestions',
            this.handleContractorSuggestion.bind(this)
        );
    }
}
