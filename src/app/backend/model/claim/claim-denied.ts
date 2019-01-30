import { Claim } from './claim';

export class ClaimDenied extends Claim {
    public reason: string;

    constructor() {
        super();
        this.status = 'ClaimDenied';
    }
}
