import { Injectable } from '@angular/core';

import { toMinor } from 'koffing/common/amount-utils';
import { SearchDeposits } from 'koffing/backend/wapi/requests/search-deposits-params';

@Injectable()
export class DepositsTableService {
    public toSearchParams(
        limit: number,
        continuationToken: string,
        formParams: any
    ): SearchDeposits {
        return {
            limit,
            walletID: formParams.walletID,
            continuationToken,
            identityID: formParams.identityID,
            sourceID: formParams.sourceID,
            depositID: formParams.depositID,
            status: formParams.status,
            createdAtFrom: formParams.createdAtFrom,
            createdAtTo: formParams.createdAtTo,
            amountFrom: toMinor(formParams.amountFrom),
            amountTo: toMinor(formParams.amountTo),
            currencyID: formParams.currencyID
        };
    }
}
