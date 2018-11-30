import { Withdrawal } from './wallets';

export class WithdrawalSearchResult {
    public continuationToken: string;
    public result: Withdrawal[];
}
