export class SearchParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;

    constructor(fromTime: Date, toTime: Date, limit: number, offset?: number) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.limit = limit;
        this.offset = offset || 0;
    }
}
