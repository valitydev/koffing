import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug'
})
export class ContractCreateComponent {

    public isLoading: boolean = false;
    public isContractorReady: boolean = false;
    public contractor: Contractor;
    public contractorBankAccount: BankAccount;
    public isPayoutToolReady: boolean = false;
    public payoutTool: PayoutToolBankAccount;

    constructor(
        private router: Router,
        private contractService: ContractService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster
    ) {}

    public onContractorChange(value: ContractorTransfer) {
        this.isContractorReady = value.valid;
        this.contractor = value.contractor;
        this.contractorBankAccount = value.contractor.bankAccount;
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolReady = value.valid;
        this.payoutTool = value.payoutTool;
    }

    public createContract() {
        if (this.isContractorReady && this.isContractorReady) {
            this.isLoading = true;
            const contractParams = new ContractParams();
            contractParams.contractor = this.contractor;
            contractParams.payoutToolParams = this.payoutTool;
            this.contractService.createContract(contractParams).then(() => {
                this.isLoading = false;
                this.claimReceiveBroadcaster.fire();
                this.navigateBack();
            });
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}
