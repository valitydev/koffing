import { Claim } from './claim';

export class ClaimPending extends Claim {

    constructor() {
        super();
        this.status = 'ClaimPending';
    }
}
