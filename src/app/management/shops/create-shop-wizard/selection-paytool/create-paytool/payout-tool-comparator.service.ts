import * as _ from 'lodash';

import { BankAccount } from 'koffing/backend/model/bank-account';

export class BankAccountComparator {

    public static isEqual(baseAccount: BankAccount, comparableAccount: BankAccount): boolean {
        if (_.isNil(comparableAccount) ||
            _.isNil(baseAccount) ||
            _.isEmpty(comparableAccount) ||
            _.isEmpty(baseAccount)) {
            return false;
        }
        const unequalKey = _.findKey(comparableAccount, (fieldValue: string, fieldName: string) => {
            if (_.isObject(fieldValue)) {
                console.error('unsupported compare type', comparableAccount, fieldValue);
            }
            const isEqual = _.chain(fieldValue).trim().isEqual(_.trim(baseAccount[fieldName])).value();
            return !isEqual;
        });
        return _.isUndefined(unequalKey);
    }
}
