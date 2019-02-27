import { Pipe, PipeTransform } from '@angular/core';
import { MODIFICATION_TYPE } from '../modification-type';

@Pipe({
    name: 'kofClaimDetailsTitle'
})
export class ClaimDetailsTitlePipe implements PipeTransform {
    private MODIFICATION_NAMES = {
        [MODIFICATION_TYPE.ShopCreation]: 'Детали магазина',
        [MODIFICATION_TYPE.ShopAccountCreation]: 'Детали счёта',
        [MODIFICATION_TYPE.ShopCategoryChange]: 'Детали категории',
        [MODIFICATION_TYPE.ShopDetailsChange]: 'Изменение информации о магазине',
        [MODIFICATION_TYPE.ShopLocationChange]: 'Изменение адреса магазина',
        [MODIFICATION_TYPE.ShopPayoutScheduleChange]: 'Детали расписания',
        [MODIFICATION_TYPE.ContractCreation]: 'Детали контракта',
        [MODIFICATION_TYPE.ContractAdjustmentCreation]: 'Поправки в контракте',
        [MODIFICATION_TYPE.ContractLegalAgreementBinding]: 'Детали соглашения',
        [MODIFICATION_TYPE.ContractReportingPreferencesChange]: 'Детали контракта',
        [MODIFICATION_TYPE.ContractTermination]: 'Детали отмены контракта',
        [MODIFICATION_TYPE.ContractPayoutToolCreation]: 'Детали средства вывода'
    };

    public transform(input: string): string {
        const name = this.MODIFICATION_NAMES[input];
        return name ? name : input;
    }
}
