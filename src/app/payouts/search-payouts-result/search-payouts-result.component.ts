import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Payout } from 'koffing/backend';

@Component({
    selector: 'kof-search-payouts-result',
    templateUrl: 'search-payouts-result.component.pug'
})
export class SearchPayoutsResultComponent implements OnInit {

    @Input()
    public payouts: Observable<Payout[]>;

    private shopID: string;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }
}
