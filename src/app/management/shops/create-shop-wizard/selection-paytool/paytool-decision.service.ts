import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Contractor } from 'koffing/backend/model/contractor';
import { ContractParams } from 'koffing/backend/model/contract-params';
import { PayoutToolParams } from 'koffing/backend/model/payout-tool-params';
import { ContractService } from 'koffing/backend/contract.service';
import { Claim } from '../../../shared/claim';
import { ClaimService } from '../../../shared/claim.service';
import { PaytoolDecision } from './paytool-decision';

@Injectable()
export class PaytoolDecisionService {

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) {}

    public createPayoutTool(contractID: number, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision>  {
        return new Promise((resolve) => {
            this.contractService.createPayoutTool(contractID, payoutToolsParams).then((result: any) => {
                this.claimService.getClaimByID(result.claimID).then((claim: Claim) => {
                    const payoutToolID = this.getPayoutToolID(contractID, claim.changeset);
                    resolve(new PaytoolDecision(contractID, payoutToolID));
                });
            });
        });
    }

    public createContract(contractor: Contractor, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision> {
        const contractParams = new ContractParams();
        contractParams.contractor = contractor;
        contractParams.payoutToolParams = payoutToolsParams;
        return new Promise((resolve) => {
            this.contractService.createContract(contractParams).then((result: any) => {
                this.claimService.getClaimByID(result.claimID).then((claim: Claim) => {
                        const contractID = this.getContractID(claim.changeset);
                        const payoutToolID = this.getPayoutToolID(contractID, claim.changeset);
                        resolve(new PaytoolDecision(contractID, payoutToolID));
                    }
                );
            });
        });
    }

    private getContractID(changeset: any[]): number {
        const contractCreationChangeset = _.filter(changeset, (item) => item.partyModificationType === 'ContractCreation');
        const sortedChangeset = _.sortBy(contractCreationChangeset, (item) => item.contract.id);
        const last = _.last(sortedChangeset);
        return last.contract.id;
    }

    private getPayoutToolID(contractID: number, changeset: any[]): number {
        const payoutChangeset = _.filter(changeset, (item) =>
        item.partyModificationType === 'ContractModification' && item.contractModificationType === 'ContractPayoutToolCreation');
        const found = _.find(payoutChangeset, (item) => item.contractID === contractID);
        return found.payoutTool.id;
    }
}
