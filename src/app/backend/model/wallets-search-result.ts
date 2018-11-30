import { Wallet } from 'koffing/backend';

export class WalletsSearchResult {
    public continuationToken: string;
    public result: Wallet[];
}
