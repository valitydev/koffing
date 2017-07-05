import { PayoutToolBankAccount } from 'koffing/backend/model/payout-tool-bank-account';

export class PaytoolTransfer {
    public payoutToolParams: PayoutToolBankAccount;
    public valid: boolean;

    constructor(payoutToolParams: PayoutToolBankAccount, valid: boolean) {
        this.payoutToolParams = payoutToolParams;
        this.valid = valid;
    }
}
