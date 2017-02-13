import { Injectable } from '@angular/core';

import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';

@Injectable()
export class SuggestionConverterService {

    public static toBankAccount(suggestion: BankSuggestion): BankAccount {
        const bankAccount = new BankAccount();
        if (suggestion) {
            bankAccount.bankName = suggestion.unrestricted_value;
            if (suggestion.data) {
                bankAccount.bankPostAccount = suggestion.data.correspondent_account;
                bankAccount.bankBik = suggestion.data.bic;
            }
        }
        return bankAccount;
    }

    public static toRussianLegalEntity(suggestion: OgranizationSuggestion): RussianLegalEntity {
        const russianLegalEntity = new RussianLegalEntity();
        if (suggestion) {
            russianLegalEntity.registeredName = suggestion.unrestricted_value;
            if (suggestion.data) {
                russianLegalEntity.registeredNumber = suggestion.data.ogrn;
                russianLegalEntity.inn = suggestion.data.inn;
                if (suggestion.data.address) {
                    russianLegalEntity.postAddress = suggestion.data.address.unrestricted_value;
                }
                if (suggestion.data.management) {
                    russianLegalEntity.representativePosition = suggestion.data.management.post;
                    russianLegalEntity.representativeFullName = suggestion.data.management.name;
                }
            }
        }
        return russianLegalEntity;
    }

}
