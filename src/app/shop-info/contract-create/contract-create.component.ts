import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PartyModification } from 'koffing/backend';
import { ContractCreateService } from './contract-create.service';
import { CONTRACT_CREATION_STEP } from './contract-creation-step';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug',
    styleUrls: ['contract-create.component.less'],
    providers: [ContractCreateService]
})
export class ContractCreateComponent implements OnInit {

    @Input()
    public shopID: string;

    @Output()
    public onCreate: EventEmitter<PartyModification[]> = new EventEmitter();

    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public step = CONTRACT_CREATION_STEP;
    public currentStep = CONTRACT_CREATION_STEP.contract;
    public validStep = false;
    private changeSet: PartyModification[] = [];

    constructor(private contractCreateService: ContractCreateService) {
        this.contractForm = this.contractCreateService.contractForm;
        this.payoutToolForm = this.contractCreateService.payoutToolForm;
    }
    
    public ngOnInit() {
        this.contractCreateService.changeSetEmitter.subscribe((changeSet: PartyModification[]) => {
            if (changeSet) {
                this.validStep = true;
                this.changeSet = changeSet;
            } else {
                this.validStep = false;
            }
        });
    }

    public createAndBindContract() {
        this.contractCreateService.bindCreatedContract(this.shopID);
        this.onCreate.emit(this.changeSet);
    }

    public next() {
        this.currentStep = this.currentStep + 1;
        this.validStep = this.isValid();
    }

    public prev() {
        this.currentStep = this.currentStep - 1;
        this.validStep = this.isValid();
    }

    private isValid(): boolean {
        return Boolean(this.changeSet[this.currentStep]);
    }
}
