import { applyMixins } from '../../../helpers/applyMixins';
import { BankAccount } from '../../bank-account';
import { PayoutToolDetails } from './payout-tool-details';

export class PayoutToolDetailsBankAccount implements BankAccount, PayoutToolDetails {

    public detailsType: string;
    public account: string;
    public bankName: string;
    public bankPostAccount: string;
    public bankBik: string;

    constructor(bankAccount: BankAccount) {
        this.detailsType = 'PayoutToolDetailsBankAccount';
        this.account = bankAccount.account;
        this.bankName = bankAccount.bankName;
        this.bankPostAccount = bankAccount.bankPostAccount;
        this.bankBik = bankAccount.bankBik;
    }
}

applyMixins(PayoutToolDetailsBankAccount, [BankAccount, PayoutToolDetails]);
