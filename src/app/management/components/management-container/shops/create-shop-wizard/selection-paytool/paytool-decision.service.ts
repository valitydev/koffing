import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { PaytoolDecision } from './paytool-decision.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { Claim } from 'koffing/backend/classes/claim/claim.class';

@Injectable()
export class PaytoolDecisionService {

    constructor(private contractService: ContractService,
                private claimService: ClaimService) {
    }

    public createPayoutTool(contractID: number, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision>  {
        return new Promise((resolve) => {
            this.contractService.createPayoutTool(contractID, payoutToolsParams).then((result: any) => {
                this.claimService.getClaimById(result.claimID).then((claim: Claim) => {
                    const payoutToolID = this.getPayoutToolId(contractID, claim.changeset);
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
                this.claimService.getClaimById(result.claimID).then((claim: Claim) => {
                        const contractID = this.getContractId(claim.changeset);
                        const payoutToolID = this.getPayoutToolId(contractID, claim.changeset);
                        resolve(new PaytoolDecision(contractID, payoutToolID));
                    }
                );
            });
        });
    }

    private getContractId(changeset: any[]): number {
        const contractCreationChangeset = _.filter(changeset, (item) => item.partyModificationType === 'ContractCreation');
        const sortedChangeset = _.sortBy(contractCreationChangeset, (item) => item.contract.id);
        const last = _.last(sortedChangeset);
        return last.contract.id;
    }

    private getPayoutToolId(contractId: number, changeset: any[]): number {
        const payoutChangeset = _.filter(changeset, (item) =>
        item.partyModificationType === 'ContractModification' && item.contractModificationType === 'ContractPayoutToolCreation');
        const found = _.find(payoutChangeset, (item) => item.contractID === contractId);
        return found.payoutTool.id;
    }
}
