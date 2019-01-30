import { Pipe, PipeTransform } from '@angular/core';

import { TOPIC_TYPES } from './topic-types';

@Pipe({
    name: 'kofWebhookTopic'
})
export class WebhookTopicPipe implements PipeTransform {
    public transform(input: string): string {
        const status = TOPIC_TYPES[input];
        return status ? status : input;
    }
}
