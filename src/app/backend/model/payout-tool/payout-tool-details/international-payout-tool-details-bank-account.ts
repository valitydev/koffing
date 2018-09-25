import { InternationalBank } from 'koffing/backend/model/international-bank';
import { applyMixins } from 'koffing/backend/helpers/applyMixins';
import { PayoutToolDetails } from './payout-tool-details';

export class PayoutToolDetailsInternationalBankAccount extends PayoutToolDetails {
    public number: string;
    public iban: string;
    public bankDetails: InternationalBank;
    public correspondentBankAccount: InternationalBank;

    constructor(options: PayoutToolDetailsInternationalBankAccount) {
        super();
        this.detailsType = 'PayoutToolDetailsInternationalBankAccount';
        this.number = options.number;
        this.iban = options.iban;
        this.bankDetails = options.bankDetails;
        this.correspondentBankAccount = options.correspondentBankAccount;
    }
}

applyMixins(PayoutToolDetailsInternationalBankAccount, [PayoutToolDetails, InternationalBank]);
