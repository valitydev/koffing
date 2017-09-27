import { Injectable } from '@angular/core';

import {
    ContractCreation,
    ContractModification,
    ContractPayoutToolCreation,
    PartyModification,
    ShopContractBinding,
    ShopCreation,
    ShopModification
} from 'koffing/backend';

@Injectable()
export class ClaimDetailsService {

    public toContractCreations(partyModifications: PartyModification[]): ContractCreation[] {
        return this.findContractChangesetPart(partyModifications, 'ContractCreation') as ContractCreation[];
    }

    public toContractPayoutToolCreations(partyModifications: PartyModification[]): ContractPayoutToolCreation[] {
        return this.findContractChangesetPart(partyModifications, 'ContractPayoutToolCreation') as ContractPayoutToolCreation[];
    }

    public toShopCreation(partyModifications: PartyModification[]): ShopCreation[] {
        return this.findShopChangesetPart(partyModifications, 'ShopCreation') as ShopCreation[];
    }

    public toContractBinding(partyModifications: PartyModification[]): ShopContractBinding[] {
        return this.findShopChangesetPart(partyModifications, 'ShopContractBinding') as ShopContractBinding[];
    }

    private findContractChangesetPart(partyModifications: PartyModification[], modificationTypeName: string): ContractModification[] {
        return partyModifications
            .filter((modificationUnit: PartyModification) =>
                modificationUnit.partyModificationType === 'ContractModification')
            .filter((contractModification: ContractModification) =>
                contractModification.contractModificationType === modificationTypeName) as ContractModification[];
    }

    private findShopChangesetPart(partyModifications: PartyModification[], modificationTypeName: string): ShopModification[] {
        return partyModifications
            .filter((modificationUnit: PartyModification) =>
                modificationUnit.partyModificationType === 'ShopModification')
            .filter((shopModification: ShopModification) =>
                shopModification.shopModificationType === modificationTypeName) as ShopModification[];
    }
}
