import { Claim } from './claim';

export class ClaimAccepted extends Claim {
    public acceptedAt: string;

    constructor() {
        super();
        this.status = 'ClaimAccepted';
    }
}
