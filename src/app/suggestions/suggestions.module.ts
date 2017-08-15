import { NgModule } from '@angular/core';

import { SuggestionsService } from './services/suggestions.service';

@NgModule({
    providers: [
        SuggestionsService
    ]
})
export class SuggestionsModule { }

export * from './classes/suggestion-settings.const';
export * from './services/suggestions.service';
