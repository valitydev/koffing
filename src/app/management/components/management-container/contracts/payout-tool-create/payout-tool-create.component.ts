import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent {

    public contractID: number = Number(this.route.snapshot.params['contractID']);
    public shopEditID: number = Number(this.route.snapshot.params['shopID']);
    public payoutToolsParams: PayoutToolBankAccount;
    public isPayoutToolValid: boolean = false;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster
    ) {}

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.payoutToolsParams = value.payoutTool;
    }

    public createPayoutTool() {
        if (this.isPayoutToolValid) {
            this.isLoading = true;
            this.contractService.createPayoutTool(this.contractID, this.payoutToolsParams).then(() => {
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
