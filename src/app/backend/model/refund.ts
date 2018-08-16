export class Refund {
    public invoiceID: string;
    public paymentID: string;
    public id: string;
    public createdAt: string;
    public amount: number;
    public currency: string;
    public reason: string;
    public status: 'pending' | 'succeeded' | 'failed';
    public error: {
        code: string;
        message: string;
    };
}
