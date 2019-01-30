import { Payer } from './payer';

export class CustomerPayer extends Payer {
    public customerID: string;

    constructor() {
        super();
        this.payerType = 'CustomerPayer';
    }
}
