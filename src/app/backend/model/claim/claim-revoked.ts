import { Claim } from './claim';

export class ClaimRevoked extends Claim {

    constructor() {
        super();
        this.status = 'ClaimRevoked';
    }
}
