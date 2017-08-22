import { Pipe, PipeTransform } from '@angular/core';
import { paymentStatuses } from 'koffing/invoices/payment-statuses';

@Pipe({
    name: 'kofPaymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = paymentStatuses[input];
        return status ? status : input;
    }
}
