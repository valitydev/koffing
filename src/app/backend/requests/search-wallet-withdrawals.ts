import { WithdrawalStatus } from 'koffing/withdrawals/withdrawal-status';

export class SearchWalletWithdrawals {
    public walletID: string;
    public identityID: string;
    public destinationID: string;
    public withdrawalID: string;
    public status: WithdrawalStatus;
    public createdAtFrom: string;
    public createdAtTo: string;
    public amountFrom: number;
    public amountTo: number;
    public currencyID: string;
    public limit: number;
    public continuationToken: string;
}
