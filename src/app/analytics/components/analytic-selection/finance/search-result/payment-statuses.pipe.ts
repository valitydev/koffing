import { Pipe, PipeTransform } from '@angular/core';

import { PAYMENT_STATUSES } from './payment-statuses.const';

@Pipe({
    name: 'kofPaymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = PAYMENT_STATUSES.GET[input];
        return status ? status : input;
    }
}
