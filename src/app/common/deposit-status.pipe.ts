import { Pipe, PipeTransform } from '@angular/core';
import { DepositStatus } from 'koffing/backend/wapi/model/deposit';
import { DepositStatusLabel } from '../deposits/deposit-status-label';

@Pipe({
    name: 'kofDepositStatus'
})
export class DepositStatusPipe implements PipeTransform {
    public transform(input: DepositStatus): string {
        return DepositStatusLabel[input] || input;
    }
}
