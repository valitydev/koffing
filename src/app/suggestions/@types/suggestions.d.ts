type SuggestionsTypes = BankSuggestion | OgranizationSuggestion;

interface SuggestionsParams {
    serviceUrl: string;
    token: string;
    type: string;
    count: number;
    onSelect: (suggestion: SuggestionsTypes) => void
}

interface JQuerySuggestions extends JQuery {
    suggestions: (params: SuggestionsParams) => JQuery
}