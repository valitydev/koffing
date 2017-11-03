import { PAYOUT_STATUS } from 'koffing/backend';

export const PAYOUT_STATUS_LABEL = {
    [PAYOUT_STATUS.confirmed]: 'Подтверждена',
    [PAYOUT_STATUS.paid]: 'Отправлена на почту',
    [PAYOUT_STATUS.cancelled]: 'Отменена',
    [PAYOUT_STATUS.unpaid]: 'Сгенерирована с ошибкой'
};
