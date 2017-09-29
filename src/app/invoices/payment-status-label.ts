import { PAYMENT_STATUS } from 'koffing/backend';

export const PAYMENT_STATUS_LABEL = {
    [PAYMENT_STATUS.pending]: 'Запущен',
    [PAYMENT_STATUS.processed]: 'Обработан',
    [PAYMENT_STATUS.captured]: 'Подтвержден',
    [PAYMENT_STATUS.cancelled]: 'Отменен',
    [PAYMENT_STATUS.refunded]: 'Возвращен',
    [PAYMENT_STATUS.failed]: 'Неуспешен'
};
