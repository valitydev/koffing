import { PartyModification } from './party-modification/party-modification';

export abstract class Claim {
    public id: number;
    public revision: number;
    public createdAt: string;
    public updatedAt: string;
    public status: string;
    public changeset: PartyModification[];
}
