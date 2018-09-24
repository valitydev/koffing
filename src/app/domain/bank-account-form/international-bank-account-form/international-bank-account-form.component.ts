import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kof-international-bank-account-form',
    templateUrl: 'international-bank-account-form.component.pug'
})
export class InternationalBankAccountFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public type: string;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.type = params.type;
        });
    }
}
