import { WithdrawalStatus } from 'koffing/wallets/withdrawal-status';
import { LogicError } from 'koffing/backend';
import { WithdrawalBody } from './withdrawal-body';
import { WithdrawalFee } from './withdrawal-fee';

export class Withdrawal {
    public id: string;
    public createdAt: string;
    public wallet: string;
    public destination: string;
    public body: WithdrawalBody;
    public fee: WithdrawalFee;
    public metadata: object;
    public status: WithdrawalStatus;
    public failure: LogicError;
}
