import { BankAccount } from './bank-account';
import { LegalEntity } from './legal-entity';

export class Contractor {
    public bankAccount: BankAccount;
    public legalEntity: LegalEntity;

    constructor() {
        this.bankAccount = new BankAccount();
        this.legalEntity = new LegalEntity();
    }
}
