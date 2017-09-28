import { PaymentMethod } from './payment-method';

export class PaymentMethodBankCard extends PaymentMethod {

    public paymentSystems: string[];

    constructor() {
        super();
        this.method = 'BankCard';
    }
}