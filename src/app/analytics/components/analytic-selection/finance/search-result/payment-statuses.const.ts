export class PAYMENT_STATUSES {
    public static get GET(): any {
        return {
            unpaid: 'Неоплаченный',
            cancelled: 'Отмененный',
            paid: 'Оплаченный',
            refunded: 'Возвращенный',
            fulfilled: 'Выполненный'
        };
    }
}
