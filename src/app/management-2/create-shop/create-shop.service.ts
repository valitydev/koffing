import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { PartyModification } from 'koffing/backend/model/claim/party-modification/party-modification';
import { FormResolver } from 'koffing/management-2/create-shop/form-resolver.service';
import { ShopCreationStep } from 'koffing/management-2/create-shop/shop-creation-step';

@Injectable()
export class CreateShopService {

    public contractGroup: FormGroup;
    public payoutToolGroup: FormGroup;
    public shopGroup: FormGroup;
    public changesetEmitter: Subject<PartyModification[] | false> = new Subject();
    private changeset: PartyModification[] = [ , , ];
    private contractID: string;
    private payoutToolID: string;

    constructor(private formResolver: FormResolver) {
        this.contractGroup = this.formResolver.prepareContractGroup();
        this.payoutToolGroup = this.formResolver.prepareBankAccountGroup();
        this.shopGroup = this.formResolver.prepareShopGroup();
        this.handleGroups();
    }

    private handleGroups() {
        this.handleStatus(this.contractGroup, () => {
            const contractCreation = this.formResolver.toContractCreation(this.contractGroup);
            this.contractID = contractCreation.contractID;
            this.changeset[ShopCreationStep.contract] = contractCreation;
        });
        this.handleStatus(this.payoutToolGroup, () => {
            const payoutToolCreation = this.formResolver.toPayoutToolCreation(this.contractID, this.payoutToolGroup);
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeset[ShopCreationStep.payoutTool] = payoutToolCreation;
        });
        this.handleStatus(this.shopGroup, () => {
            this.changeset[ShopCreationStep.shop] = this.formResolver.toShopCreation(this.contractID, this.payoutToolID, this.shopGroup);
        });
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe((status) => {
                this.changesetEmitter.next(status === 'VALID' ? this.changeset : false);
            });
    }
}
