import { RegistryItem } from './registry-item';

export class Registry {
    public items: RegistryItem[];
    public fromTime: Date;
    public toTime: Date;
    public client: string;

    constructor(registryItems?: RegistryItem[], fromTime?: Date, toTime?: Date, client?: string) {
        this.items = registryItems;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.client = client;
    }
}
