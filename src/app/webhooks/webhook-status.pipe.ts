import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofWebhookStatus'
})
export class WebhookStatusPipe implements PipeTransform {

    public transform(active: boolean): string {
        return active ? 'Активен' : 'Неактивен';
    }
}
