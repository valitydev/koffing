import { PayoutToolParams } from './payout-tool-params';
import { BankAccount } from './bank-account';

/**
 * @deprecated Use koffing/backend/model/payout-tool/payout-tool-details/payout-tool-bank-account
 */
export class PayoutToolBankAccount extends PayoutToolParams {
    public bankAccount: BankAccount;

    constructor() {
        super();
        this.payoutToolType = 'PayoutToolBankAccount';
    }
}
