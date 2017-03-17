import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';

export class PaytoolTransfer {
    public payoutToolParams: PayoutToolBankAccount;
    public valid: boolean;

    constructor(payoutToolParams: PayoutToolBankAccount, valid: boolean) {
        this.payoutToolParams = payoutToolParams;
        this.valid = valid;
    }
}
