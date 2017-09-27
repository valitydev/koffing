import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofClaimModificationType'
})
export class ClaimTypePipe implements PipeTransform {

    private modificationNames = {
        0: '', // nan
        1: 'Создание магазина', // shopCreation
        2: 'Создание контракта', // contractCreation
        3: 'Изменение контракта' // contractBinding
    };

    public transform(input: number): string {
        const name = this.modificationNames[input];
        return name ? name : input;
    }
}
