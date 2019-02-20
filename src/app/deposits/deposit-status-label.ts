import { DepositStatus } from 'koffing/backend/wapi/model/deposit';

export const DepositStatusLabel = {
    [DepositStatus.Pending]: 'В процессе',
    [DepositStatus.Succeeded]: 'Успешно',
    [DepositStatus.Failed]: 'Ошибка'
};
