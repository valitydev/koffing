import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {

    private statuses = {
        ClaimAccepted: 'Подтверждена',
        ClaimDenied: 'Отклонена',
        ClaimPending: 'На рассмотрении',
        ClaimRevoked: 'Отозвана'
    };

    public transform(input: string): string {
        const status = this.statuses[input];
        return status ? status : input;
    }
}
