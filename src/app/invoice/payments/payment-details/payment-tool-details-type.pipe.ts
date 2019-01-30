import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofPaymentToolDetailsType'
})
export class PaymentToolDetailsTypePipe implements PipeTransform {
    private names = {
        PaymentToolDetailsPaymentTerminal: 'Терминал',
        PaymentToolDetailsBankCard: 'Банковская карта',
        PaymentToolDetailsDigitalWallet: 'Электронный кошелек'
    };

    public transform(input: string): string {
        const status = this.names[input];
        return status ? status : input;
    }
}
