export class CreateInvoiceParams {
    public shopID: string;
    public amount: number;
    public currency: string;
    public metadata: object;
    public dueDate: string;
    public product: string;
    public description?: string;
}
