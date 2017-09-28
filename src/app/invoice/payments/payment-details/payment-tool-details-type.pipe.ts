import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofPaymentToolDetailsType'
})
export class PaymentToolDetailsTypePipe implements PipeTransform {

    private names = {
        PaymentToolDetailsPaymentTerminalData: 'Терминал',
        PaymentToolDetailsCardData: 'Банковская карта'
    };

    public transform(input: string): string {
        const status = this.names[input];
        return status ? status : input;
    }
}
