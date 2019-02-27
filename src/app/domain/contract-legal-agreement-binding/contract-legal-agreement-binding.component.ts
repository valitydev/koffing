import { Component, Input } from '@angular/core';

import { ContractLegalAgreementBinding } from 'koffing/backend';

@Component({
    selector: 'kof-contract-legal-agreement-binding',
    templateUrl: 'contract-legal-agreement-binding.component.pug'
})
export class ContractLegalAgreementBindingComponent {
    @Input()
    public legalAgreement: ContractLegalAgreementBinding;
}
