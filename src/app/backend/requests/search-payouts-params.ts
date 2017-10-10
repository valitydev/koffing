export class SearchPayoutsParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;
    public payoutStatus?: string;
    public payoutID?: string;
    public payoutToolType?: string;
}
