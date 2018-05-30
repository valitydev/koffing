import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofPaymentToolDetailsTokenProvider'
})
export class PaymentToolDetailsTokenProviderPipe implements PipeTransform {

    private names = {
        applepay: 'Apple Pay',
        googlepay: 'Google Pay',
        samsungpay: 'Samsung Pay'
    };

    public transform(input: string): string {
        const status = this.names[input];
        return status ? status : input;
    }
}
