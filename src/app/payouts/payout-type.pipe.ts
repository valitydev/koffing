import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofPayoutType'
})
export class PayoutTypePipe implements PipeTransform {
    public transform(type: string): string {
        switch (type) {
            case 'payment':
                return 'Выплата';
            case 'refund':
                return 'Возврат';
        }
    }
}
