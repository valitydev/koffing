import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent implements OnInit {

    public contractID: number = Number(this.route.snapshot.params['contractID']);
    public shopEditID: number = Number(this.route.snapshot.params['shopID']);
    public payoutTool: PayoutToolBankAccount;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.payoutTool = this.getInstance();
    }

    public createPayoutTool(form: any) {
        if (form.valid) {
            this.isLoading = true;
            this.contractService.createPayoutTool(this.contractID, this.payoutTool).then(() => {
                this.isLoading = false;
                this.router.navigate(['/management/contracts']);
            });
        }
    }

    private getInstance() {
        const bankAccount = new BankAccount();
        const instance = new PayoutToolBankAccount();
        instance.bankAccount = bankAccount;
        return instance;
    }
}
