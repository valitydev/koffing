import { Deposit } from '../model/deposit';

export interface SearchDepositResult {
    continuationToken: string;
    result: Deposit[];
}
