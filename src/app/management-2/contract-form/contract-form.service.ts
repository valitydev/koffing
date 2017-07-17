import { Injectable } from '@angular/core';

@Injectable()
export class ContractFormService {

    public toFormValue(suggestion: OgranizationSuggestion): any {
        const value: any = {};
        if (suggestion) {
            value.registeredName = suggestion.unrestricted_value;
            if (suggestion.data) {
                value.registeredNumber = suggestion.data.ogrn;
                value.inn = suggestion.data.inn;
                if (suggestion.data.address) {
                    value.postAddress = suggestion.data.address.unrestricted_value;
                }
                if (suggestion.data.management) {
                    value.representativePosition = suggestion.data.management.post;
                    value.representativeFullName = suggestion.data.management.name;
                }
            }
        }
        return value;
    }
}
