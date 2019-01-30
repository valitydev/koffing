import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofRefundStatus'
})
export class PaymentRefundsPipe implements PipeTransform {
    public transform(status: string): string {
        switch (status) {
            case 'pending':
                return 'Выполняется';
            case 'succeeded':
                return 'Успех';
            case 'failed':
                return 'Ошибка';
        }
    }
}
