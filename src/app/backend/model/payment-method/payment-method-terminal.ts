import { PaymentMethod } from './payment-method';

export class PaymentMethodTerminal extends PaymentMethod {
    
    public providers: string[];
    
    constructor() {
        super();
        this.method = 'PaymentTerminal';
    }
}
