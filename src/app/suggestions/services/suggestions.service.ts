import { Injectable } from '@angular/core';

import { ConfigService } from 'koffing/backend/config.service';
import { SuggestionSettings } from 'koffing/suggestions/classes/suggestion-settings.const';

@Injectable()
export class SuggestionsService {
    constructor(private config: ConfigService) {}

    public initBankSuggestions(selector: string, callback: (suggestion: SuggestionsTypes) => void) {
        this.init(SuggestionSettings.bankType, selector, callback);
    }

    public initContractorSuggestions(
        selector: string,
        callback: (suggestion: SuggestionsTypes) => void
    ) {
        this.init(SuggestionSettings.partyType, selector, callback);
    }

    private init(type: string, selector: string, callback: (suggestion: SuggestionsTypes) => void) {
        (<JQuerySuggestions>$(selector)).suggestions(<SuggestionsParams>{
            serviceUrl: SuggestionSettings.serviceUrl,
            token: this.config.suggestionsToken,
            type,
            count: 5,
            floating: true,
            addon: 'none',
            onSelect: callback
        });
    }
}
