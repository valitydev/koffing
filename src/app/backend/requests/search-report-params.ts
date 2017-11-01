export class SearchReportParams {

    public fromTime: Date;
    public toTime: Date;

    constructor(fromTime: Date, toTime: Date) {
        this.fromTime = fromTime;
        this.toTime = toTime;
    }
}
