import { DepositStatus } from 'koffing/backend/wapi/model/deposit';

export const DEPOSIT_STATUS_LABEL = {
    [DepositStatus.Pending]: 'В процессе',
    [DepositStatus.Succeeded]: 'Успешно',
    [DepositStatus.Failed]: 'Ошибка'
};
