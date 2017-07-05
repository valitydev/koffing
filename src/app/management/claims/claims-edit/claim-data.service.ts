import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Shop } from 'koffing/backend/model/shop';
import { ShopService } from 'koffing/backend/shop.service';
import { ClaimData } from './claim-data';
import { ShopEditingParams } from './shop-editing-params';
import { ContractCreation } from './classes/contract-creation';
import { ContractPayoutToolCreation } from './classes/contract-payout-tool-creation';
import { ShopCreation } from './classes/shop-creation';
import { ShopUpdate } from './classes/shop-update';

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
