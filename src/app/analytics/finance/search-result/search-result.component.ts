import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent {

    @Input()
    public invoices: any;
}
