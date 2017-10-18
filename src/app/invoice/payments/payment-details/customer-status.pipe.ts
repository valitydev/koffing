import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofCustomerStatus'
})
export class CustomerStatusPipe implements PipeTransform {

    private statuses = {
        ready: 'Готов',
        unready: 'Не готов'
    };

    public transform(input: string): string {
        const status = this.statuses[input];
        return status ? status : input;
    }
}
