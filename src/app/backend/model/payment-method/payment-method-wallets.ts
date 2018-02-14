import { PaymentMethod } from './payment-method';

export class PaymentMethodWallets extends PaymentMethod {

    public providers: string[];

    constructor() {
        super();
        this.method = 'DigitalWallet';
    }
}
