import { WITHDRAWAL_STATUS } from 'koffing/backend';

export const DEPOSIT_STATUS_LABEL = {
    [WITHDRAWAL_STATUS.Pending]: 'В процессе',
    [WITHDRAWAL_STATUS.Succeeded]: 'Успешно',
    [WITHDRAWAL_STATUS.Failed]: 'Ошибка'
};
