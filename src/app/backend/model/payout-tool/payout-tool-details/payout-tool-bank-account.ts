import { PayoutToolDetails } from './payout-tool-details';
import { BankAccount } from '../../bank-account';

export class PayoutToolBankAccount extends PayoutToolDetails {

    public bankAccount: BankAccount;

    constructor(bankAccount: BankAccount) {
        super();
        this.type = 'PayoutToolBankAccount';
        this.bankAccount = bankAccount;
    }
}
