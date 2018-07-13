export class SearchParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public continuationToken?: string;

    constructor(fromTime: Date, toTime: Date, limit: number, continuationToken?: string) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.limit = limit;
        this.continuationToken = continuationToken;
    }
}
