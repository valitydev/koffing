import { Injectable } from '@angular/core';

import { Shop } from 'koffing/backend/classes/shop.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { ShopService } from 'koffing/backend/services/shop.service';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';
import { PaytoolDecision } from 'koffing/management/shops/create-shop-wizard/selection-paytool/paytool-decision.class';
import { PaytoolDecisionService } from 'koffing/management/shops/create-shop-wizard/selection-paytool/paytool-decision.service';
import { ClaimDataService } from './claim-data.service';
import { ClaimData } from './claim-data.class';
import { Claim } from '../../shared/claim.class';
import { ClaimService } from '../../shared/claim.service';
import { ContractCreation } from './classes/contract-creation.class';
import { ContractModification } from './classes/contract-modification.class';
import { ContractPayoutToolCreation } from './classes/contract-payout-tool-creation.class';
import { ShopCreation } from './classes/shop-creation.class';
import { ShopModification } from './classes/shop-modification.class';
import { ShopUpdate } from './classes/shop-update.class';

@Injectable()
export class ClaimsEditService {

    constructor(
        private claimService: ClaimService,
        private shopService: ShopService,
        private paytoolDecisionService: PaytoolDecisionService,
        private claimDataService: ClaimDataService
    ) { }

    public getClaimData(): Promise<ClaimData> {
        return new Promise((resolve) => {
            this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
                if (claims.length > 0) {
                    this.handleClaim(claims[0]).then((claimData: ClaimData) => {
                        resolve(claimData);
                    });
                }
            });
        });
    }

    public saveChanges(claimData: ClaimData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.claimService.revokeClaim(claimData.claimID, {
                reason: 'edit claim'
            }).then(() => {
                if (claimData.contractor && claimData.payoutToolParams && !claimData.shop) {
                    return this.createContract(claimData.contractor, claimData.payoutToolParams).then(() => {
                        resolve();
                    });
                } else if (claimData.contractor && claimData.payoutToolParams && claimData.shop) {
                    return this.createContractAndShop(claimData.contractor, claimData.payoutToolParams, claimData.shop).then(() => {
                        resolve();
                    });
                } else if (claimData.payoutToolParams && !claimData.contractor && !claimData.shop) {
                    return this.createPayoutTool(claimData.payoutToolContractId, claimData.payoutToolParams).then(() => {
                        resolve();
                    });
                } else if (claimData.payoutToolParams && claimData.shop && !claimData.contractor) {
                    return this.createPayoutToolAndShop(claimData.payoutToolContractId, claimData.payoutToolParams, claimData.shop).then(() => {
                        resolve();
                    });
                } else if (claimData.shopEditingParams && !claimData.shop && !claimData.contractor) {
                    return this.updateShop(claimData.shopEditingParams.shop.id, claimData.shopEditingParams.updatedShopParams).then(() => {
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        });
    }

    private createContract(contractor: Contractor, payoutToolParams: PayoutToolParams): Promise<PaytoolDecision> {
        return this.paytoolDecisionService.createContract(contractor, payoutToolParams);
    }

    private createContractAndShop(contractor: Contractor, payoutToolParams: PayoutToolParams, shop: Shop): Promise<any> {
        return this.paytoolDecisionService.createContract(contractor, payoutToolParams).then((decision: PaytoolDecision) => {
            return this.shopService.createShop(new ShopParams(
                shop.details,
                decision.contractID,
                decision.payoutToolID
            ));
        });
    }

    private createPayoutTool(contractID: number, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision> {
        return this.paytoolDecisionService.createPayoutTool(contractID, payoutToolsParams);
    }

    private createPayoutToolAndShop(contractID: number, payoutToolsParams: PayoutToolParams, shop: Shop): Promise<string> {
        return this.createPayoutTool(contractID, payoutToolsParams).then((decision: PaytoolDecision) => {
            return this.shopService.createShop(new ShopParams(
                shop.details,
                decision.contractID,
                decision.payoutToolID
            ));
        });
    }

    private updateShop(shopID: number, updatedShopParams: ShopParams): Promise<string> {
        return this.shopService.updateShop(shopID, updatedShopParams);
    }

    private handleClaim(claim: Claim): Promise<ClaimData> {
        return new Promise((resolve) => {
            const claimData = new ClaimData();
            const handlersPromises = [];

            claimData.claimID = claim.id;
            for (const setItem of claim.changeset) {
                switch (setItem.partyModificationType) {
                    case 'ContractCreation': {
                        handlersPromises.push(
                            this.claimDataService.handleContractCreation(claimData, <ContractCreation> setItem)
                        );
                        break;
                    }
                    case 'ContractModification': {
                        if ((<ContractModification> setItem).contractModificationType === 'ContractPayoutToolCreation') {
                            handlersPromises.push(
                                this.claimDataService.handleContractPayoutToolCreation(claimData, <ContractPayoutToolCreation> setItem)
                            );
                        }
                        break;
                    }
                    case 'ShopCreation': {
                        handlersPromises.push(
                            this.claimDataService.handleShopCreation(claimData, <ShopCreation> setItem)
                        );
                        break;
                    }
                    case 'ShopModification': {
                        if ((<ShopModification> setItem).shopModificationType === 'ShopUpdate') {
                            handlersPromises.push(
                                this.claimDataService.handleShopUpdate(claimData, <ShopUpdate> setItem)
                            );
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }

            Promise.all(handlersPromises).then(() => {
                resolve(claimData);
            });
        });
    }

}
