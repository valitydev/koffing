import { PaymentToolDetails } from './payment-tool-details';

export class PaymentToolDetailsBankCard extends PaymentToolDetails {

    public cardNumberMask: string;
    public bin: string;
    public lastDigits: string;
    public paymentSystem: string;

    constructor() {
        super();
        this.detailsType = 'PaymentToolDetailsBankCard';
    }
}
