import { ClaimStatus } from './claim-status.class';
import { PartyModification } from './party-modification.class';

export class Claim {

    public id: number;
    public changeset: PartyModification[];
    public status: ClaimStatus;
}
