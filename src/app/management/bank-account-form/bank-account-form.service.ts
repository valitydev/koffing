import { Injectable } from '@angular/core';

@Injectable()
export class BankAccountFormService {

    public toFormValue(suggestion: BankSuggestion): any {
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
