import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { ClaimData } from 'koffing/management/classes/claim-data.class';
import { ContractCreation } from 'koffing/backend/classes/claim/contract-creation.class';
import { ContractPayoutToolCreation } from 'koffing/backend/classes/claim/contract-payout-tool-creation.class';
import { ShopCreation } from 'koffing/backend/classes/claim/shop-creation.class';
import { ShopService } from 'koffing/backend/services/shop.service';
import { ShopUpdate } from 'koffing/backend/classes/claim/shop-update.class';
import { ShopEditingParams } from 'koffing/management/components/management-container/claims-edit/shop-editing-params.class';
import { Shop } from 'koffing/backend/classes/shop.class';

@Injectable()
export class ClaimDataService {

    constructor(
        private shopService: ShopService
    ) { }

    public handleContractCreation(claimData: ClaimData, setItem: ContractCreation): Promise<any> {
        return new Promise((resolve) => {
            claimData.contractor = setItem.contract.contractor;
            resolve();
        });
    }

    public handleContractPayoutToolCreation(claimData: ClaimData, setItem: ContractPayoutToolCreation): Promise<any> {
        return new Promise((resolve) => {
            claimData.payoutToolContractId = setItem.contractID;
            claimData.payoutToolParams = setItem.payoutTool.params;
            resolve();
        });
    }

    public handleShopCreation(claimData: ClaimData, setItem: ShopCreation): Promise<any> {
        return new Promise((resolve) => {
            claimData.shop = setItem.shop;
            resolve();
        });
    }

    public handleShopUpdate(claimData: ClaimData, setItem: ShopUpdate): Promise<any> {
        return new Promise((resolve) => {
            claimData.shopEditingParams = new ShopEditingParams();
            claimData.shopEditingParams.claimShopChanges = setItem.details;
            this.shopService.getShop(setItem.shopID).then((shop: Shop) => {
                _.assign(claimData.shopEditingParams.shop, shop);
                claimData.shopEditingParams.shop.update(setItem.details);
                resolve();
            });
        });
    }
}
