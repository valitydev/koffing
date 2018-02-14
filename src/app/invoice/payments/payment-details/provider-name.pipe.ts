import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofProviderName'
})
export class ProviderNamePipe implements PipeTransform {

    private names = {
        euroset: 'Евросеть',
        DigitalWalletDetailsQIWI: 'QIWI'
    };

    public transform(input: string): string {
        const status = this.names[input];
        return status ? status : input;
    }
}
