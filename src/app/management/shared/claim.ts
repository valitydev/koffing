import { ClaimStatus } from './claim-status';
import { PartyModification } from './party-modification';

export class Claim {

    public id: number;
    public changeset: PartyModification[];
    public status: ClaimStatus;
}
