export class CreateInvoiceParams {
    public shopID: number;
    public amount: number;
    public currency: string;
    public metadata: Object;
    public dueDate: string;
    public product: string;
    public description?: string;
}
