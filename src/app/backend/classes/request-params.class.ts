export class RequestParams {
    public fromTime: string;
    public toTime: string;
    public splitUnit: string = 'minute';
    public splitSize: string = '1';
    public paymentMethod: string = 'bank_card';

    constructor(fromTime: string, toTime: string, splitUnit?: string, splitSize?: string, paymentMethod?: string) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.splitUnit = splitUnit ? splitUnit : this.splitUnit;
        this.splitSize = splitSize ? splitSize : this.splitSize;
        this.paymentMethod = paymentMethod ? paymentMethod : this.paymentMethod;
    }
}
