export class SearchPayoutsParams {
    public fromTime: Date;
    public toTime: Date;
    public limit: number;
    public offset?: number;
    public status?: string;
    public payoutID?: string;
    public payoutToolType?: string;
}
