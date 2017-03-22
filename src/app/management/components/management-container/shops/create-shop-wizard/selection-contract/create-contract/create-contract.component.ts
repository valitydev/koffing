import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { ContractorTransfer } from './contractor-transfer.class';
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
    public form: NgForm;

    public sameActualAddressChecked: boolean;

    @Input()
    private defaultContractor: Contractor;

    constructor(private suggestionsService: SuggestionsService) { }

    public ngOnInit() {
        this.contractor = this.createInstance();
        if (this.defaultContractor) {
            _.assign(this.contractor, this.defaultContractor);
        }
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
        this.initContractorSuggestions();
    }

    public emitAddress() {
        const legalEntity = this.contractor.legalEntity as RussianLegalEntity;
        this.sameActualAddressChecked = _.chain(legalEntity.actualAddress)
            .trim().isEqual(_.trim(legalEntity.postAddress)).value();
        this.emitData();
    }

    public isCopyPostAddressAvailable() {
        const legalEntity = this.contractor.legalEntity as RussianLegalEntity;
        return _.isUndefined(legalEntity.postAddress);
    }

    public emitData() {
        this.onChange.emit(new ContractorTransfer(this.contractor, this.form.valid));
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public copyPostAddress() {
        if (this.sameActualAddressChecked) {
            const legalEntity = this.contractor.legalEntity as RussianLegalEntity;
            this.form.controls['actualAddress'].setValue(legalEntity.postAddress);
            this.emitData();
        }
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
        this.setFormControls(suggestionAccount);
        this.emitData();
    }

    private handleContractorSuggestion(suggestion: OgranizationSuggestion) {
        const suggestionEntity = SuggestionConverterService.toRussianLegalEntity(suggestion);
        this.setFormControls(suggestionEntity);
        this.emitData();
    }

    private setFormControls(object: any) {
        _.forEach(object, (value, fieldName) => {
            const control = this.form.controls[fieldName];
            if (control) {
                control.setValue(value);
            }
        });
    }

    private initBankSuggestions() {
        const selector = '.contract-bank-suggestions';
        this.suggestionsService.initBankSuggestions(selector, this.handleBankSuggestion.bind(this));
    }

    private initContractorSuggestions() {
        const selector = '.contractor-suggestions';
        this.suggestionsService.initContractorSuggestions(selector, this.handleContractorSuggestion.bind(this));
    }
}
