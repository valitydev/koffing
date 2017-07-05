import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolBankAccount } from 'koffing/backend/model/payout-tool-bank-account';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';
import { PaytoolTransfer } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer';
import { CreatePayoutToolComponent } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';

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
    @ViewChild('createPaytoolRef')
    private createPaytoolComponent: CreatePayoutToolComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster,
        private claimCreateBroadcaster: ClaimCreateBroadcaster
    ) {}

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.payoutToolsParams = value.payoutToolParams;
    }

    public createPayoutTool() {
        if (this.isPayoutToolValid) {
            this.isLoading = true;
            this.contractService.createPayoutTool(this.contractID, this.payoutToolsParams).then(() => {
                this.isLoading = false;
                this.claimReceiveBroadcaster.fire();
                this.claimCreateBroadcaster.fire();
                this.navigateBack();
            });
        } else {
            this.createPaytoolComponent.highlightErrors();
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}
