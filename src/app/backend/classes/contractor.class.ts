import { BankAccount } from './bank-account.class';
import { LegalEntity } from './legal-entity.class';

export class Contractor {
    public bankAccount: BankAccount;
    public legalEntity: LegalEntity;

    constructor() {
        this.bankAccount = new BankAccount();
        this.legalEntity = new LegalEntity();
    }
}
