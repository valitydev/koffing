export class EventTypePresent {
    public name: string;
    public description: string;
    public topic: string;

    constructor(name: string, description: string, topic: 'CustomersTopic' | 'InvoicesTopic') {
        this.name = name;
        this.description = description;
        this.topic = topic;
    }
}
