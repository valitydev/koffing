export class CreatePayoutParams {
    public id: string;
    public shopID: string;
    public payoutToolID: string;
    public amount: number;
    public currency: string;
    public metadata?: any;
}
