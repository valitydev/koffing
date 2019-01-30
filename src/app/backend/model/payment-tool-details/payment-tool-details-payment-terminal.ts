import { PaymentToolDetails } from './payment-tool-details';

export class PaymentToolDetailsPaymentTerminal extends PaymentToolDetails {
    public provider: string;

    constructor() {
        super();
        this.detailsType = 'PaymentToolDetailsPaymentTerminal';
    }
}
