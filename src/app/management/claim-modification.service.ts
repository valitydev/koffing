import { Injectable } from '@angular/core';

import { PartyModification, Shop, ShopCreation, ShopDetails } from 'koffing/backend';
import { MODIFICATION_TYPE } from 'koffing/management/modification-type';

@Injectable()
export class ClaimModificationService {

    public getModificationType(modifications: PartyModification[]): string {
        let result = 'none';
        modifications.forEach((modification: any) => {
            if (modification.shopModificationType === MODIFICATION_TYPE.ShopCreation) {
                result = MODIFICATION_TYPE.ShopCreation;
            } else if (modification.shopModificationType === MODIFICATION_TYPE.ShopContractBinding) {
                const hasCreationContract = Boolean(modifications.find((item: any) => item.contractModificationType === MODIFICATION_TYPE.ContractCreation));
                const hasCreationPayoutTool = Boolean(modifications.find((item: any) => item.contractModificationType === MODIFICATION_TYPE.ContractPayoutToolCreation));
                if (hasCreationContract) {
                    result = MODIFICATION_TYPE.ContractCreation;
                } else if (hasCreationPayoutTool) {
                    result = MODIFICATION_TYPE.ContractPayoutToolCreation;
                } else {
                    result = MODIFICATION_TYPE.ShopContractBinding;
                }
            }
        });
        return result;
    }

    public getRelatedShopDetails(modifications: PartyModification[], shops: Shop[]): ShopDetails {
        let result;
        let shopID: string;
        const shopCreation = modifications.find((modification: any) => {
            if (modification.shopModificationType) {
                shopID = modification.shopID;
            }
            return modification.shopModificationType === MODIFICATION_TYPE.ShopCreation;
        }) as ShopCreation;
        if (shopCreation) {
            result = shopCreation.details;
        } else if (shopID) {
            result = shops.find((shop) => shop.id === shopID).details;
        }
        return result;
    }
}
