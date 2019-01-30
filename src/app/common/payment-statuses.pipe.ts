import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_STATUS_LABEL } from 'koffing/invoices/payment-status-label';

@Pipe({
    name: 'kofPaymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {
    public transform(input: string): string {
        const status = PAYMENT_STATUS_LABEL[input];
        return status ? status : input;
    }
}
