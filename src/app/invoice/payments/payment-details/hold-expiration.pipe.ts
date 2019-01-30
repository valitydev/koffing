import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofOnHoldExpiration'
})
export class HoldExpirationPipe implements PipeTransform {
    private statuses = {
        cancel: 'Зачисление в пользу плательщика',
        capture: 'Зачисление в пользу мерчанта'
    };

    public transform(input: string): string {
        const status = this.statuses[input];
        return status ? status : input;
    }
}
