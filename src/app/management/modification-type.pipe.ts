import { Pipe, PipeTransform } from '@angular/core';
import { MODIFICATION_TYPE } from './modification-type';

@Pipe({
    name: 'kofClaimModificationType'
})
export class ModificationTypePipe implements PipeTransform {

    private MODIFICATION_NAMES = {
        [MODIFICATION_TYPE.ShopCreation]: 'Создание магазина',
        [MODIFICATION_TYPE.ContractCreation]: 'Создание контракта',
        [MODIFICATION_TYPE.ContractPayoutToolCreation]: 'Создание средства вывода',
        [MODIFICATION_TYPE.ShopContractBinding]: 'Изменение контракта'
    };

    public transform(input: string): string {
        const name = this.MODIFICATION_NAMES[input];
        return name ? name : input;
    }
}
