import { Component, Input, OnInit } from '@angular/core';

import { Contract } from 'koffing/backend/classes/contract.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';

@Component({
    selector: 'kof-contract-view',
    templateUrl: 'contract-view.component.pug'
})
export class ContractViewComponent implements OnInit {

    @Input()
    public isShowPayoutTools: boolean = true;

    @Input()
    public contract: Contract;
    
    public ngOnInit() {
        if (!this.contract.contractor) {
            this.contract.contractor = new Contractor();
        }
        if (!this.contract.contractor.bankAccount) {
            this.contract.contractor.bankAccount = new BankAccount();
        }
        if (!this.contract.contractor.legalEntity) {
            this.contract.contractor.legalEntity = new RussianLegalEntity();
        }
    }
}
