import { NgModule } from '@angular/core';

import { SuggestionsService } from './services/suggestions.service';
import { SuggestionConverterService } from './services/suggestion-converter.service';

@NgModule({
    providers: [
        SuggestionsService,
        SuggestionConverterService
    ]
})
export class SuggestionsModule { }

export * from './classes/suggestion-settings.const';
export * from './services/suggestions.service';
export * from './services/suggestion-converter.service';
