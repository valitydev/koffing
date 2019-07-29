import { PaymentToolDetails } from 'koffing/backend';

export class PaymentToolDetailsDigitalWallet extends PaymentToolDetails {
    public digitalWalletDetailsType: string;

    constructor() {
        super();
        this.detailsType = 'PaymentToolDetailsDigitalWallet';
    }
}
