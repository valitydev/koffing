import { PaymentMethod } from './payment-method';

export class PaymentMethodBankCard extends PaymentMethod {

    public paymentSystems: string[];
    public tokenProviders: string[];

    constructor() {
        super();
        this.method = 'BankCard';
    }
}
