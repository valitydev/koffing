import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { PartyModification, ShopContractBinding } from 'koffing/backend';
import { ContractFormService, PayoutToolFormService } from 'koffing/domain';
import { CONTRACT_CREATION_STEP } from './contract-creation-step';

@Injectable()
export class ContractCreateService {

    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public changeSetEmitter: Subject<PartyModification[] | boolean> = new Subject();
    private changeSet: PartyModification[] = [];
    private contractID: string;
    private payoutToolID: string;

    constructor(
        private contractFormService: ContractFormService,
        private payoutToolFormService: PayoutToolFormService
    ) {
        this.contractForm = this.contractFormService.initForm();
        this.payoutToolForm = this.payoutToolFormService.initForm();
        this.handleGroups();
    }

    public bindCreatedContract(shopID: string) {
        if (this.contractID && this.payoutToolID) {
            this.changeSet[CONTRACT_CREATION_STEP.bind] = new ShopContractBinding(shopID, this.contractID, this.payoutToolID);
            this.changeSetEmitter.next(this.changeSet);
        }
    }

    private handleGroups() {
        this.handleStatus(this.contractForm, () => {
            const contractCreation = this.contractFormService.toContractCreation(this.contractForm);
            this.contractID = contractCreation.contractID;
            this.changeSet[CONTRACT_CREATION_STEP.contract] = contractCreation;
        });
        this.handleStatus(this.payoutToolForm, () => {
            const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(this.contractID, this.payoutToolForm);
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeSet[CONTRACT_CREATION_STEP.payoutTool] = payoutToolCreation;
        });
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe((status) => this.changeSetEmitter.next(status === 'VALID' ? this.changeSet : false));
    }
}
