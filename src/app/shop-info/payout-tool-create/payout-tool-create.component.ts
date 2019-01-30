import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContractPayoutToolCreation } from 'koffing/backend';
import { PayoutToolFormService } from 'koffing/domain';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent implements OnInit {
    @Input()
    public contractID: string;

    @Output()
    public onCreate: EventEmitter<ContractPayoutToolCreation> = new EventEmitter();

    public type: string;

    public payoutToolForm: FormGroup;

    constructor(
        private payoutToolFormService: PayoutToolFormService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.payoutToolForm = this.payoutToolFormService.initForm(params.type);
            this.type = params.type;
        });
    }

    public createPayoutTool() {
        const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(
            this.contractID,
            this.payoutToolForm,
            this.type
        );
        this.onCreate.emit(payoutToolCreation);
    }
}
