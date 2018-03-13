import { LogicError } from 'koffing/backend';

export class PaymentRefund {
    public id: string;
    public createdAt: string;
    public amount: number;
    public currency: string;
    public reason: string;
    public status: string;
    public error?: LogicError;
}
