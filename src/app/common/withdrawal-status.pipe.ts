import { Pipe, PipeTransform } from '@angular/core';
import { WithdrawalStatus } from 'koffing/wallets/withdrawal-status';

@Pipe({
    name: 'kofWithdrawalStatus'
})
export class WithdrawalStatusPipe implements PipeTransform {

    public transform(input: WithdrawalStatus): string {
        switch (input) {
            case WithdrawalStatus.Succeeded:
                return 'Успешно';
            case WithdrawalStatus.Pending:
                return 'В процессе';
            case WithdrawalStatus.Failed:
                return 'Ошибка';
            default:
                return input;
        }
    }
}
