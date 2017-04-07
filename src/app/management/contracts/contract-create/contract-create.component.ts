import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';
import { ContractorTransfer } from 'koffing/management/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PaytoolTransfer } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { CreatePayoutToolComponent } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';
import { CreateContractComponent } from 'koffing/management/shops/create-shop-wizard/selection-contract/create-contract/create-contract.component';

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
    public payoutToolParams: PayoutToolBankAccount;
    @ViewChild('createPaytoolRef')
    private createPaytoolComponent: CreatePayoutToolComponent;
    @ViewChild('createContractRef')
    private createContractComponent: CreateContractComponent;

    constructor(
        private router: Router,
        private contractService: ContractService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster,
        private claimCreateBroadcaster: ClaimCreateBroadcaster
    ) {}

    public onContractorChange(value: ContractorTransfer) {
        this.isContractorReady = value.valid;
        this.contractor = value.contractor;
        this.contractorBankAccount = value.contractor.bankAccount;
        this.createPaytoolComponent.compareAccounts();
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolReady = value.valid;
        this.payoutToolParams = value.payoutToolParams;
    }

    public createContract() {
        if (this.isContractorReady && this.isPayoutToolReady) {
            this.isLoading = true;
            const contractParams = new ContractParams();
            contractParams.contractor = this.contractor;
            contractParams.payoutToolParams = this.payoutToolParams;
            this.contractService.createContract(contractParams).then(() => {
                this.isLoading = false;
                this.claimReceiveBroadcaster.fire();
                this.claimCreateBroadcaster.fire();
                this.navigateBack();
            });
        } else {
            if (!this.isContractorReady) {
                this.createContractComponent.highlightErrors();
            }
            if (!this.isPayoutToolReady) {
                this.createPaytoolComponent.highlightErrors();
            }
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}
