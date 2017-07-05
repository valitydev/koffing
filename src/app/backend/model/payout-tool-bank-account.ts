import { PayoutToolParams } from './payout-tool-params';
import { BankAccount } from './bank-account';

export class PayoutToolBankAccount extends PayoutToolParams {
    public bankAccount: BankAccount;

    constructor() {
        super();
        this.payoutToolType = 'PayoutToolBankAccount';
    }
}
