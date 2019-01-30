import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { PartyModification, ShopContractBinding } from 'koffing/backend';
import { ContractFormService, PayoutToolFormService } from 'koffing/domain';
import { CONTRACT_CREATION_STEP } from './contract-creation-step';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ContractCreateService {
    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public changeSetEmitter: Subject<PartyModification[] | boolean> = new Subject();
    public type: string;
    private changeSet: PartyModification[] = [];
    private contractID: string;
    private payoutToolID: string;

    constructor(
        private contractFormService: ContractFormService,
        private route: ActivatedRoute,
        private payoutToolFormService: PayoutToolFormService
    ) {
        this.route.params.subscribe(params => {
            this.contractForm = this.contractFormService.initForm(params.type);
            this.payoutToolForm = this.payoutToolFormService.initForm(params.type);
            this.handleGroups();
            this.type = params.type;
        });
    }

    public bindCreatedContract(shopID: string) {
        if (this.contractID && this.payoutToolID) {
            this.changeSet[CONTRACT_CREATION_STEP.bind] = new ShopContractBinding(
                shopID,
                this.contractID,
                this.payoutToolID
            );
            this.changeSetEmitter.next(this.changeSet);
        }
    }

    private handleGroups() {
        this.handleStatus(this.contractForm, () => {
            this.contractFormService
                .toContractCreation(this.contractForm, this.type)
                .subscribe(contractCreation => {
                    this.contractID = contractCreation.contractID;
                    this.changeSet[CONTRACT_CREATION_STEP.contract] = contractCreation;
                });
        });
        this.handleStatus(this.payoutToolForm, () => {
            const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(
                this.contractID,
                this.payoutToolForm,
                this.type
            );
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeSet[CONTRACT_CREATION_STEP.payoutTool] = payoutToolCreation;
        });
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe(status =>
                this.changeSetEmitter.next(status === 'VALID' ? this.changeSet : false)
            );
    }
}
