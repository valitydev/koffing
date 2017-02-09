import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';

export class PaytoolTransfer {
    public payoutTool: PayoutToolBankAccount;
    public valid: boolean;

    constructor(payoutTool: PayoutToolBankAccount, valid: boolean) {
        this.payoutTool = payoutTool;
        this.valid = valid;
    }
}
