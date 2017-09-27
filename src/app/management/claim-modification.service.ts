import { Injectable } from '@angular/core';

import { PartyModification, Shop, ShopCreation, ShopDetails } from 'koffing/backend';
import { ModificationType } from 'koffing/management/modification-type';
import { CLAIM_TYPE } from 'koffing/management/claim-type';

@Injectable()
export class ClaimModificationService {

    public getModificationType(modifications: PartyModification[]): ModificationType {
        let result = ModificationType.nan;
        modifications.forEach((modification: any) => {
            if (modification.shopModificationType === CLAIM_TYPE.ShopCreation) {
                result = ModificationType.shopCreation;
            } else if (modification.shopModificationType === CLAIM_TYPE.ShopContractBinding) {
                const hasCreation = modifications.find((item: any) =>
                    item.contractModificationType === CLAIM_TYPE.ContractCreation);
                result = !!hasCreation ? ModificationType.contractCreation : ModificationType.contractBinding;
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
            return modification.shopModificationType === 'ShopCreation';
        }) as ShopCreation;
        if (shopCreation) {
            result = shopCreation.details;
        } else if (shopID) {
            result = shops.find((shop) => shop.id === shopID).details;
        }
        return result;
    }
}
