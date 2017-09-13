import { PaymentFlow } from 'koffing/backend/model/payment/payment-flow';

export class PaymentFlowHold extends PaymentFlow {

    public onHoldExpiration: string;

    public heldUntil: string;

    constructor() {
        super();
        this.type = 'PaymentFlowHold';
    }
}
