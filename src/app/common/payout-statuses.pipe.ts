import { Pipe, PipeTransform } from '@angular/core';
import { PAYOUT_STATUS_LABEL } from 'koffing/payouts/payout-status-label';

@Pipe({
    name: 'kofPayoutStatus'
})
export class PayoutStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = PAYOUT_STATUS_LABEL[input];
        return status ? status : input;
    }
}
