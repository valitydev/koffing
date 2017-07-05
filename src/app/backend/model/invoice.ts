export class Invoice {
    public id: string;
    public shopID: number;
    public createdAt: string;
    public dueDate: string;
    public amount: number;
    public currency: string;
    public metadata: object;
    public product: string;
    public description: string;
    public status: string;
    public reason: string;
}
