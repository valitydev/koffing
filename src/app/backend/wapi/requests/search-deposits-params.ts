import { DepositStatus } from '../model/deposit';

export interface SearchDeposits {
    walletID?: string;
    identityID?: string;
    depositID?: string;
    sourceID?: string;
    status?: DepositStatus;
    createdAtFrom?: string;
    createdAtTo?: string;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
    limit: number;
    continuationToken?: string;
}
