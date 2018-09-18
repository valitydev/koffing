import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { camelCase } from 'lodash';

import { ContractFormService, PayoutToolFormService, ShopFormService } from 'koffing/domain';
import { PartyModification } from 'koffing/backend';
import { ShopCreationStep } from './shop-creation-step';

@Injectable()
export class CreateShopService {

    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public shopForm: FormGroup;
    public changeSetEmitter: Subject<PartyModification[] | boolean> = new Subject();
    public type: string;
    private changeSet: PartyModification[] = [];
    private contractID: string;
    private payoutToolID: string;

    constructor(private shopFormService: ShopFormService,
                private contractFormService: ContractFormService,
                private payoutToolFormService: PayoutToolFormService,
                private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            this.shopForm = this.shopFormService.initForm();
            this.contractForm = this.contractFormService.initForm(params.type);
            this.payoutToolForm = this.payoutToolFormService.initForm(params.type);
            this.handleGroups();
            this.type = params.type;
        });
    }

    public getBankAccountPossibility(bankAccountSource: any): true | { summary: string; detail: string } {
        const bankAccount = this.getNonresidentBankAccount(bankAccountSource);
        if (!bankAccount.iban) {
            const details = bankAccount.bankDetails;
            if (!(details.bic || details.abartn || details.name && details.countryCode && details.address)) {
                return {
                    summary: 'В данных международной банковской организации не заполнены все поля',
                    detail: 'Необходимо заполнить либо IBAN, либо BIC, либо ABA RTN, либо наименование, страну и адрес'
                };
            }
        }
        return true;
    }

    public getNextPossibility(step: number): true | { summary: string; detail: string } {
        switch (step) {
            case ShopCreationStep.payoutTool:
                return this.getBankAccountPossibility(this.payoutToolForm.value.bankAccount);
            case ShopCreationStep.contract:
                return this.getBankAccountPossibility(this.contractForm.value.bankAccount);
        }
        return true;
    }

    private handleGroups() {
        this.handleStatus(this.contractForm, () => {
            const {value} = this.contractForm;
            const contractFormData = this.type === 'nonresident' ? {
                ...value,
                bankAccount: this.getNonresidentBankAccount(value.bankAccount)
            } : value;
            console.dir(contractFormData);
            this.contractFormService.toContractCreation(contractFormData, this.type).subscribe((contractCreation) => {
                this.contractID = contractCreation.contractID;
                this.changeSet[ShopCreationStep.contract] = contractCreation;
            });
        });
        this.handleStatus(this.payoutToolForm, () => {
            const {value} = this.payoutToolForm;
            const payoutToolFormData = this.type === 'nonresident' ? {
                ...value,
                bankAccount: this.getNonresidentBankAccount(value.bankAccount)
            } : value;
            const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(this.contractID, payoutToolFormData, this.type);
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeSet[ShopCreationStep.payoutTool] = payoutToolCreation;
        });
        this.handleStatus(this.shopForm, () => {
            this.changeSet[ShopCreationStep.shop] = this.shopFormService.toShopCreation(this.contractID, this.payoutToolID, this.shopForm);
        });
    }

    private getNonresidentBankAccount(bankAccount: any) {
        return {
            number: bankAccount.number,
            iban: bankAccount.iban,
            bankDetails: this.getPrefixedWithoutPrefix(bankAccount, 'bankDetails'),
            correspondentBankAccount: this.getPrefixedWithoutPrefix(bankAccount, 'correspondentBankAccount')
        };
    }

    private getPrefixedWithoutPrefix(params: object, prefix: string = '') {
        const result: any = {};
        for (const name of Object.keys(params)) {
            if (name.indexOf(prefix) === 0) {
                result[camelCase(name.slice(prefix.length))] = params[name];
            }
        }
        return result;
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe((status) =>
                this.changeSetEmitter.next(status === 'VALID' ? this.changeSet : false));
    }
}
