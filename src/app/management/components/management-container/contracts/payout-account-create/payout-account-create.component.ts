import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';

@Component({
    selector: 'kof-payout-account-create',
    templateUrl: 'payout-account-create.component.pug'
})
export class PayoutAccountCreateComponent implements OnInit {

    public newPayoutAccount: PayoutAccount;
    public isLoading: boolean = false;

    private contractID: number = Number(this.route.snapshot.params['contractID']);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.newPayoutAccount = new PayoutAccount();
        const payoutToolBankAccount = new PayoutToolBankAccount();
        payoutToolBankAccount.bankAccount = new BankAccount();
        this.newPayoutAccount.tool = payoutToolBankAccount;
    }

    public createPayoutAccount(form: any) {
        if (form.valid) {
            this.isLoading = true;
            this.contractService.createPayoutAccount(this.contractID, this.newPayoutAccount).then(() => {
                this.router.navigate(['/management/contracts']);
                this.isLoading = false;
            });
        }
    }
}
