import { INVOICE_STATUS } from 'koffing/backend';

export const INVOICE_STATUS_LABEL = {
    [INVOICE_STATUS.unpaid]: 'Не оплачен',
    [INVOICE_STATUS.cancelled]: 'Отменен',
    [INVOICE_STATUS.paid]: 'Оплачен',
    [INVOICE_STATUS.fulfilled]: 'Погашен'
};
