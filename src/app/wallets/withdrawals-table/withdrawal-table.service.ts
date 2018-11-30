import { Injectable } from '@angular/core';

import { SearchWalletWithdrawals } from 'koffing/backend';
import { toMinor } from 'koffing/common/amount-utils';

@Injectable()
export class WithdrawalTableService {

    public toSearchParams(limit: number, continuationToken: string, formParams: any): SearchWalletWithdrawals {
        const result = new SearchWalletWithdrawals();
        result.limit = limit;
        result.continuationToken = continuationToken;
        result.walletID = formParams.walletID;
        result.identityID = formParams.identityID;
        result.destinationID = formParams.destinationID;
        result.status = formParams.status;
        result.createdAtFrom = formParams.createdAtFrom;
        result.createdAtTo = formParams.createdAtTo;
        result.amountFrom = toMinor(formParams.amountFrom);
        result.amountTo = toMinor(formParams.amountTo);
        result.currencyID = formParams.currencyID;
        return result;
    }
}
