import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug'
})
export class ContractCreateComponent {

    public isLoading: boolean = false;
    public isContractorReady: boolean = false;
    public contractor: Contractor;
    public isPayoutToolReady: boolean = false;
    public payoutTool: PayoutToolBankAccount;

    constructor(
        private router: Router,
        private contractService: ContractService
    ) {}

    public onContractorReady(contractor: Contractor) {
        this.isContractorReady = true;
        this.contractor = contractor;
    }

    public onPayoutToolReady(payoutTool: PayoutToolBankAccount) {
        this.isPayoutToolReady = true;
        this.payoutTool = payoutTool;
    }

    public createContract() {
        if (this.isContractorReady && this.isContractorReady) {
            this.isLoading = true;
            const contractParams = new ContractParams();
            contractParams.contractor = this.contractor;
            contractParams.payoutToolParams = this.payoutTool;
            this.contractService.createContract(contractParams).then(() => {
                this.isLoading = false;
                this.navigateBack();
            });
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}
