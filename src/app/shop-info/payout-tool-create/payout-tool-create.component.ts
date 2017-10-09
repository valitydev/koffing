import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContractPayoutToolCreation } from 'koffing/backend';
import { PayoutToolFormService } from 'koffing/domain';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent implements OnInit {

    @Input()
    public contractID: string;

    @Output()
    public onCreate: EventEmitter<ContractPayoutToolCreation> = new EventEmitter();

    public payoutToolForm: FormGroup;

    constructor(private payoutToolFormService: PayoutToolFormService) { }
    
    public ngOnInit() {
        this.payoutToolForm = this.payoutToolFormService.initForm();
    }

    public createPayoutTool() {
        const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(this.contractID, this.payoutToolForm);
        this.onCreate.emit(payoutToolCreation);
    }
}
