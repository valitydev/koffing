import { PaymentFlow } from 'koffing/backend/model/payment/payment-flow';

export class PaymentFlowInstant extends PaymentFlow {
    constructor() {
        super();
        this.type = 'PaymentFlowInstant';
    }
}
