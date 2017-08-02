import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { ContractCreation, ContractPayoutToolCreation, ShopCreation } from 'koffing/backend/model/claim';
// TODO fix urls
import { RussianLegalEntity } from 'koffing/backend/model/contract/contractor/russian-legal-entity';
import { PayoutToolBankAccount } from 'koffing/backend/model/payout-tool/payout-tool-details/payout-tool-bank-account';
import { ShopDetails } from 'koffing/backend/model/shop/shop-details';
import { ShopLocationUrl } from 'koffing/backend/model/shop/shop-location/shop-location-url';

@Injectable()
export class FormResolver {

    constructor(private fb: FormBuilder) { }

    public prepareContractGroup(): FormGroup {
        return this.fb.group({
            registeredName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            registeredNumber: ['', [
                Validators.required,
                Validators.pattern(/^(\d{13}|\d{15})$/)
            ]],
            inn: ['', [
                Validators.required,
                Validators.pattern(/^(\d{10}|\d{12})$/)
            ]],
            postAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            actualAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            representativePosition: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeFullName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeDocument: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            bankAccount: this.prepareBankAccountGroup()
        });
    }

    public prepareBankAccountGroup(): FormGroup {
        return this.fb.group({
            account: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankPostAccount: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankBik: ['', [
                Validators.required,
                Validators.pattern(/^\d{9}$/)
            ]]
        });
    }

    public prepareShopGroup(): FormGroup {
        return this.fb.group({
            url: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            name: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', Validators.maxLength(1000)]
        });
    }

    public toContractCreation(contractForm: FormGroup): ContractCreation {
        const contractor = new RussianLegalEntity(contractForm.value);
        return new ContractCreation(uuid(), contractor);
    }

    public toPayoutToolCreation(contractID: string, bankAccount: FormGroup): ContractPayoutToolCreation {
        const details = new PayoutToolBankAccount(bankAccount.value);
        return new ContractPayoutToolCreation(contractID, uuid(), details);
    }

    public toShopCreation(contractID: string, payoutToolID: string, shopForm: FormGroup): ShopCreation {
        const val = shopForm.value;
        return new ShopCreation({
            shopID: uuid(),
            location: new ShopLocationUrl(val.url),
            details: new ShopDetails(val.name, val.description),
            contractID, payoutToolID
        });
    }
}
